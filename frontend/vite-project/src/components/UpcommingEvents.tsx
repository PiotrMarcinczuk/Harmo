import { useState, useEffect, useCallback } from "react";
import EventsAPI from "../api/EventsAPI";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import TaskBlock from "./TaskBlock";
import useEventPopup from "../hooks/useEventPopup";
import EventDetails from "./EventDetails";

export default function UpcommingEvents() {
  const { getUpcomingEvents } = EventsAPI();
  const { timetableId } = useParams();
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const { isEventPopup, changeEventPopup } = useEventPopup();
  const { userInfo } = useSelector((state: any) => state.auth);
  const { load } = useSelector((state: any) => state.load);

  useEffect(() => {
    const fetchEvents = async () => {
      const events = await getUpcomingEvents(
        userInfo.user_id,
        Number(timetableId)
      );
      setEvents(events);
    };
    if (!load) fetchEvents();
  }, [load]);

  const handleEventClick = useCallback((event: any) => {
    setSelectedEvent(event);
    changeEventPopup(true);
  }, []);

  return (
    <>
      {events && events.length > 0 ? (
        <section className="bg-blue-menu max-w-[300px] absolute right-0 top-4">
          <div className="flex flex-col p-2">
            <p className="text-3xl font-semibold mb-2">
              Nadchodzące dla ciebie
            </p>
            {events.map((event: any) => {
              return (
                <div
                  onClick={() => handleEventClick(event)}
                  key={event.event_id}
                  className="flex items-center my-1 p-1 w-full bg-gray-300 upcomming-event-card">
                  <TaskBlock data={event} />
                </div>
              );
            })}
            {selectedEvent && (
              <EventDetails
                isEventPopup={isEventPopup}
                changeEventPopup={changeEventPopup}
                event={selectedEvent}
              />
            )}
          </div>
        </section>
      ) : (
        ""
      )}
    </>
  );
}
