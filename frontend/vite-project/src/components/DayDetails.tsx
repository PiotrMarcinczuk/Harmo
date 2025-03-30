import { useCallback, useState } from "react";
import { Popup } from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import useEventPopup from "../hooks/useEventPopup";
import EventDetails from "./EventDetails";
import useMobileMenu from "../hooks/useMobileMenu";
import useFormatDate from "../hooks/useFormatDate";

export default function DayDetails({
  isDayPopup,
  changeDayPopup,
  events,
}: any) {
  const [selectedEvent, setSelectedEvent] = useState();
  const { isEventPopup, changeEventPopup } = useEventPopup();
  const handleEventClick = useCallback((event: any) => {
    setSelectedEvent(event);
    changeEventPopup(true);
    changeDayPopup(false);
  }, []);
  const { xlMenu, mobileMenu } = useMobileMenu();
  const { formatHours } = useFormatDate();

  return (
    <>
      <Popup
        contentStyle={{
          margin: "auto",
          marginTop: "25px",
          marginBottom: "25px",
          borderRadius: "10px",
          padding: "0",
          width: xlMenu ? "50%" : mobileMenu ? "90%" : "70%",
          height: "auto",
          overflow: "auto",
        }}
        open={isDayPopup}
        onClose={() => changeDayPopup(false)}
        modal>
        <div className="flex flex-col">
          {events.map((event: any) => {
            return (
              <div
                key={event.event_name + event.start_time + event.event_id}
                onClick={() => handleEventClick(event)}
                className="bg-custom-purple rounded-lg hover:cursor-pointer ease-out hover:-translate-y-2 delay-75 duration-500 text-4xl mt-3 m-2 p-2 flex justify-between">
                <span>{event.event_name}</span>
                <span>
                  {formatHours(event.start_time)} -{" "}
                  {formatHours(event.end_time)}
                </span>
              </div>
            );
          })}
        </div>
      </Popup>
      {selectedEvent && (
        <EventDetails
          isEventPopup={isEventPopup}
          changeEventPopup={changeEventPopup}
          event={selectedEvent}
        />
      )}
    </>
  );
}
