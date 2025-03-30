import { useCallback, useEffect, useState } from "react";
import AdminNavigation from "./AdminNavigation";
import EventsAPI from "../api/EventsAPI";
import TaskBlock from "./TaskBlock";
import { useParams } from "react-router-dom";
import useEventPopup from "../hooks/useEventPopup";
import EventDetails from "./EventDetails";
import UserAPI from "../api/UserAPI";
import UserNavigation from "./UserNavigation";
import UpcommingEvents from "./UpcommingEvents";
import useMobileMenu from "../hooks/useMobileMenu";
import MenuButton from "./MenuButton";
export default function MyTask() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const { isEventPopup, changeEventPopup } = useEventPopup();
  const { getEventForCurrentUser } = EventsAPI();
  const { timetableId } = useParams();
  const { getUser } = UserAPI();
  const { isMenuOpen, setIsMenuOpen, xlMenu } = useMobileMenu();

  const fetchEventsForCurrentUser = useCallback(async () => {
    try {
      const response = await getEventForCurrentUser(timetableId);
      setEvents(response);
    } catch (error) {
      return error;
    }
  }, []);

  useEffect(() => {
    fetchEventsForCurrentUser();
  }, [timetableId]);

  const handleEventClick = useCallback((event: any) => {
    setSelectedEvent(event);
    changeEventPopup(true);
  }, []);

  return (
    <section className="h-full">
      <div className="w-full relative pt-2">
        <MenuButton isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        <div
          className={`fixed transform z-50 transition-transform duration-300  ${
            isMenuOpen ? "translate-x-0" : "-translate-x-96"
          }`}>
          {getUser().is_admin ? <AdminNavigation /> : <UserNavigation />}
        </div>
        <div className="max-w-1732 flex flex-wrap mx-auto md:justify-center">
          <div
            className={`w-full md:mx-auto md:w-auto mt-8 1400px:pr-72 4xl:pr-56`}>
            <h2 className="mt-2 text-5xl font-semibold">Moje zadania:</h2>
            {events && events.length > 0 ? (
              events.map((event: any) => {
                return (
                  <div
                    key={event.event_id}
                    className="bg-white hover:cursor-pointer rounded hover:bg-red-200 p-2 m-2"
                    onClick={() => handleEventClick(event)}>
                    <TaskBlock data={event} />
                  </div>
                );
              })
            ) : (
              <div className="text-4xl text-center w-full bg-white p-4 mt-10 mx-auto w-1/2">
                <p>W planie nie ma dla mnie żadnych zadań</p>
              </div>
            )}
          </div>
        </div>
        {xlMenu && <UpcommingEvents />}
        {selectedEvent && (
          <EventDetails
            isEventPopup={isEventPopup}
            changeEventPopup={changeEventPopup}
            event={selectedEvent}
          />
        )}
      </div>
    </section>
  );
}
