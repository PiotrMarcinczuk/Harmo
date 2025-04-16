import { useState, useEffect, useCallback } from "react";
import { type EventValidationData } from "../interfaces/app_interfaces";
import EventsAPI from "../api/EventsAPI";
import { useParams, useNavigate } from "react-router-dom";
import EventValidation from "../validation/EventValidation";
import SelectUser from "./SelectUser";
import { useSelector } from "react-redux";
export default function CreateEvent({
  setComponentType,
  isCreating,
  tempData,
}: any) {
  const [data, setData] = useState<any>({
    eventName: (tempData && tempData.event_name) || "",
    description: (tempData && tempData.description) || "",
    isEventGroup: false,
    timetableId: (tempData && tempData.timetable_id) || "",
    eventStartTime: (tempData && tempData.start_time.split("T")[0]) || "",
    eventStartTimeH: (tempData && tempData.start_time.slice(11, 16)) || "",
    eventEndTime: (tempData && tempData.end_time.split("T")[0]) || "",
    eventEndTimeH: (tempData && tempData.end_time.slice(11, 16)) || "",
    assignedUsersId: (tempData && tempData.userIds) || [],
    eventId: (tempData && tempData.event_id) || "",
  });

  const [validationData, setValidationData] = useState<EventValidationData>({
    eventName: false,
    startTime: false,
    endTime: false,
  });
  const { createEvent, updateEvent } = EventsAPI();
  const { validateData } = EventValidation();
  const { timetableId } = useParams();
  const { eventName, startTime, endTime } = validationData;
  const { userInfo } = useSelector((state: any) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!tempData && !isCreating)
      navigate(`/plan/${timetableId}/wszystkie-zadania`);
  }, []);

  const handleChangeInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setData({ ...data, [e.target.name]: e.target.value });
    },
    [data]
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const combinedStartTime = `${data.eventStartTime}T${data.eventStartTimeH}`;
      const combinedEndTime = `${data.eventEndTime}T${data.eventEndTimeH}`;
      const re = isCreating
        ? await createEvent({
            ...data,
            eventStartTime:
              combinedStartTime.length > 1 ? combinedStartTime : null,
            eventEndTime: combinedEndTime.length > 1 ? combinedEndTime : null,
            timetableId: parseInt(timetableId || "0"),
            userId: userInfo.user_id,
          })
        : await updateEvent({
            ...data,
            eventStartTime: combinedStartTime,
            eventEndTime: combinedEndTime,
            timetableId: parseInt(timetableId || "0"),
            eventId: tempData.event_id,
            userId: userInfo.user_id,
          });

      if (re && (re.event_id || re.message === "Event updated")) {
        setComponentType("EventsList");
        navigate(`/plan/${timetableId}/wszystkie-zadania`);
      }
      if (re.response && re.response.data) {
        const validationResult = validateData(re.response.data.error) || {
          eventName: false,
          startTime: false,
          endTime: false,
        };
        setValidationData(validationResult);
      }
    },
    [data]
  );

  return (
    <div className="w-full h-screen">
      <form
        className="px-2 mb-10 mx-auto md:px-0 md:w-1/2"
        onSubmit={(e) => handleSubmit(e)}>
        <div className="flex flex-col w-full">
          <div className="mt-4">
            <label className="text-xl">Nazwa</label>
            <input
              className={`w-full bg-white text-xl pl-2 ${
                !eventName
                  ? "outline-none"
                  : "p-2 border-2 bg-white focus:outline-none border-custom-validation-red outline-custom-validation-red"
              }`}
              type="text"
              name="eventName"
              onChange={handleChangeInput}
              defaultValue={data.eventName}
            />
            {!eventName ? null : (
              <p className="text-custom-validation-red font-bold md:text-2xl">
                Nazwa wydarzenia jest wymagana i może zawierać maksymalnie 25
                znaków
              </p>
            )}
          </div>
          <div className="mt-4">
            <label className="text-xl">Opis</label>
            <textarea
              className={`w-full bg-white text-xl pl-2 h-20 outline-none`}
              name="description"
              onChange={handleChangeInput}
              defaultValue={data.description}
            />
          </div>
          <div className="mt-4">
            <label className="text-xl">Czas rozpoczęcia</label>
            <input
              className={`w-full bg-white text-xl pl-2 ${
                !startTime
                  ? "outline-none"
                  : "p-2 border-2 bg-white focus:outline-none border-custom-validation-red outline-custom-validation-red"
              }`}
              type="date"
              name="eventStartTime"
              onChange={handleChangeInput}
              defaultValue={data.eventStartTime}
            />
            <input
              className={`mt-2 ${
                !startTime
                  ? "outline-none"
                  : "p-2 border-2 bg-white focus:outline-none border-custom-validation-red outline-custom-validation-red"
              }`}
              type="time"
              name="eventStartTimeH"
              onChange={handleChangeInput}
              defaultValue={data.eventStartTimeH}
            />
            {!startTime ? null : (
              <p className="text-custom-validation-red font-bold md:text-2xl">
                Nieprawidłowy czas rozpoczęcia
              </p>
            )}
          </div>
          <div className="mt-4">
            <label className="text-xl">Czas zakończenia</label>
            <input
              className={`w-full bg-white text-xl pl-2 ${
                !endTime
                  ? "outline-none"
                  : "p-2 border-2 bg-white focus:outline-none border-custom-validation-red outline-custom-validation-red"
              }`}
              type="date"
              name="eventEndTime"
              onChange={handleChangeInput}
              defaultValue={data.eventEndTime}
            />
            <input
              className={`mt-2 ${
                !endTime
                  ? "outline-none"
                  : "p-2 border-2 bg-white focus:outline-none border-custom-validation-red outline-custom-validation-red"
              }`}
              type="time"
              name="eventEndTimeH"
              onChange={handleChangeInput}
              defaultValue={data.eventEndTimeH}
            />
            {!endTime ? null : (
              <p className="text-custom-validation-red font-bold md:text-2xl">
                Niepoprawny czas zakończenia
              </p>
            )}
          </div>
          <SelectUser
            data={data}
            setData={setData}
            assignedUsersId={data.assignedUsersId}
          />

          <button type="submit" className="mt-8 py-4 px-4 form-button ">
            {isCreating ? "Dodaj" : "Edytuj"}
          </button>
        </div>
      </form>
    </div>
  );
}
