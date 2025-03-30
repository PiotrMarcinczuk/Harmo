import AdminNavigation from "./AdminNavigation";
import EventsAPI from "../api/EventsAPI";
import EventsList from "./EventsList";
import UserAPI from "../api/UserAPI";
import { useState, useEffect, useCallback, memo } from "react";
import { useParams, Link } from "react-router-dom";
import { type Event } from "../interfaces/app_interfaces";
import useEvent from "../hooks/useEvent";
import CreateEvent from "./CreateEvent";
import Modal from "react-modal";
import EmptyList from "./EmptyList";
import UpcommingEvents from "./UpcommingEvents";
import "reactjs-popup/dist/index.css";
import useMobileMenu from "../hooks/useMobileMenu";
import MenuButton from "./MenuButton";

const EventManage = memo(function EventManage({ initialComponentType }: any) {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [componentType, setComponentType] = useState("");
  const { timetableId } = useParams();
  const { getEventsWithoutCalendar, removeEvent } = EventsAPI();
  const [events, setEvents] = useState<Event[]>([]);
  const { event, changeEvent } = useEvent();
  const { getUser } = UserAPI();
  const { isMenuOpen, setIsMenuOpen, xlMenu } = useMobileMenu();

  const fetchEvents = useCallback(async () => {
    if (!timetableId) return;
    try {
      const response = await getEventsWithoutCalendar(parseInt(timetableId));
      setEvents(response);
    } catch (error) {
      return error;
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [timetableId, componentType]);

  useEffect(() => {
    setComponentType(initialComponentType);
  }, [initialComponentType]);

  const handlePopup = useCallback(async () => {
    if (!event) return;
    setComponentType("EventsList");
    setIsPopupVisible(true);
  }, [event]);

  const handleClickPopupConfirm = useCallback(async () => {
    if (!event.event_id) return;
    try {
      await removeEvent(getUser().user_id, event.event_id);
      changeEvent(null);
      setIsPopupVisible(false);
      await fetchEvents();
    } catch (error) {
      return error;
    }
  }, [event]);

  return (
    <section className="h-full">
      <div className="w-full relative pt-2">
        <MenuButton isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        <div
          className={`fixed transform z-50 transition-transform duration-300  ${
            isMenuOpen ? "translate-x-0" : "-translate-x-96"
          }`}>
          {getUser().is_admin ? <AdminNavigation /> : null}
        </div>
        <div className="max-w-1920 mx-auto flex flex-wrap">
          <div className="w-full mx-auto rounded mt-10">
            <div className="flex bg-gray-300 mt-2 mx-auto w-full md:w-2/3 xl:w-1/2 mt-12 md:mt-4">
              <div className="flex mx-auto text-lg lg:text-2xl">
                <Link
                  to={`/plan/${timetableId}/wszystkie-zadania`}
                  className="flex items-center font-bold px-1 lg:px-4 manage-option">
                  <p>Lista</p>
                </Link>
                <Link
                  to={`/plan/${timetableId}/wszystkie-zadania/dodaj`}
                  className="flex items-center font-bold px-1 lg:px-4 manage-option">
                  <p>Dodaj</p>
                </Link>
                <Link
                  to={
                    event &&
                    `/plan/${timetableId}/wszystkie-zadania/edytuj/${event.event_id}`
                  }
                  className="flex items-center font-bold px-1 lg:px-4 manage-option">
                  <p>Edytuj</p>
                </Link>
                <button
                  onClick={handlePopup}
                  className="flex items-center font-bold px-1 lg:px-4 manage-option">
                  <p>Usuń</p>
                </button>
              </div>
            </div>

            {xlMenu && <UpcommingEvents />}

            {events && events.length > 0 && componentType === "EventsList" && (
              <EventsList events={events} onSelectEvent={changeEvent} />
            )}
            {events &&
              events.length === 0 &&
              componentType === "EventsList" && (
                <EmptyList componentType="EventsList" />
              )}
            {componentType === "CreateEvent" && (
              <CreateEvent
                setComponentType={setComponentType}
                isCreating={true}
              />
            )}
            {componentType === "EditEvent" && (
              <CreateEvent
                setComponentType={setComponentType}
                tempData={event}
                isCreating={false}
              />
            )}

            <Modal
              isOpen={isPopupVisible}
              onRequestClose={() => setIsPopupVisible(false)}
              className="modal max-w-[800px] max-h-[600px] p-6 bg-white rounded-lg shadow-lg mx-auto my-20"
              overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
              <div
                className="text-2xl text-nowrap"
                tabIndex={0}
                ref={(div) => div && div.focus()}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleClickPopupConfirm();
                  if (e.key === "Escape") setIsPopupVisible(false);
                }}>
                <div className="content max-w-[800px] mx-auto">
                  <p className="mb-2 text-center">
                    Czy napewno chcesz usunac to zadanie?
                  </p>
                  {event && (
                    <>
                      <p>Nazwa: {event.event_name}</p>
                      <p>Data: {event.start_time.split("T")[0]}</p>
                    </>
                  )}
                </div>
                <div className="actions content max-w-[800px] mx-auto mt-2 relative">
                  <button
                    onClick={() => setIsPopupVisible(false)}
                    className="button bg-green-700 p-2">
                    Anuluj
                  </button>
                  <button
                    className="button bg-red-700 p-2 absolute right-0"
                    onClick={handleClickPopupConfirm}>
                    Potwierdz
                  </button>
                </div>
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </section>
  );
});

export default EventManage;
