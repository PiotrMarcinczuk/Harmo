import { Popup } from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import UserAPI from "../api/UserAPI";
import { useEffect, useState, memo } from "react";
import { type Collaborator } from "../interfaces/app_interfaces";
import useMobileMenu from "../hooks/useMobileMenu";
import useFormatDate from "../hooks/useFormatDate";

const EventDetails = memo(function EventDetails({
  isEventPopup,
  changeEventPopup,
  event,
}: any) {
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const { getCollaboratorsForEvent } = UserAPI();
  const { xlMenu, mobileMenu } = useMobileMenu();
  const { convertDateToString, formatHours, formatDate } = useFormatDate();

  useEffect(() => {
    const fetchCollaborators = async () => {
      try {
        const response = await getCollaboratorsForEvent(Number(event.event_id));
        setCollaborators(response);
      } catch (error) {
        return error;
      }
    };
    fetchCollaborators();
  }, [isEventPopup]);

  return (
    <Popup
      contentStyle={{
        margin: "auto",
        marginTop: "50px",
        borderRadius: "10px",
        padding: "0",
        width: xlMenu ? "50%" : mobileMenu ? "90%" : "70%",
      }}
      open={isEventPopup}
      onClose={() => changeEventPopup(false)}
      modal>
      <div className="flex flex-col p-1 text-2xl xs:text-3xl sm:text-4xl">
        <div className="w-full mx-auto bg-custom-purple rounded-lg m-2 p-2 flex justify-between xs:w-auto xs:mx-0">
          <span>{convertDateToString(new Date(event.start_time))}</span>
          <span>{formatDate(event.start_time)}</span>
        </div>
        <div className="w-full  mx-auto bg-custom-purple rounded-lg m-2 p-2">
          <span>{event.event_name}</span>
        </div>
        <div className="w-full mx-auto bg-custom-purple rounded-lg m-2 p-2 flex justify-between">
          <span>
            {formatHours(event.start_time)} - {formatHours(event.end_time)}
          </span>
          <span>
            {formatDate(event.start_time)} - {formatDate(event.end_time)}
          </span>
        </div>
        <div className="border border-gray-600 m-2 p-2">
          <p>{event.description ? event.description : "Brak opisu"}</p>
        </div>
        <p className="mt-10 m-2 mb-0 text-4xl font-semibold">
          Użytkownicy przypisani do zadania:
        </p>
        <div className="flex m-2 flex-wrap">
          {collaborators && collaborators.length === 0 && (
            <span>Brak przypisanych użytkowników</span>
          )}
          {collaborators &&
            collaborators.map((collaborator) => {
              return (
                <span
                  key={collaborator.user_id + collaborator.nickname}
                  className="p-2">
                  {collaborator.nickname}
                </span>
              );
            })}
        </div>
      </div>
    </Popup>
  );
});

export default EventDetails;
