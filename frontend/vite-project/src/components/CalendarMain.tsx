import AdminNavigation from "../components/AdminNavigation";
import EventsAPI from "../api/EventsAPI";
import UserAPI from "../api/UserAPI";
import EventDetails from "../components/EventDetails";
import useEventPopup from "../hooks/useEventPopup";
import useDayPopup from "../hooks/useDayPopup";
import { useParams } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import arrow from "/image/arrow.png";
import outdated_icon from "/image/outdated-icon.png";
import DayDetails from "./DayDetails";
import UserNavigation from "./UserNavigation";
import MenuButton from "./MenuButton";
import useMobileMenu from "../hooks/useMobileMenu";

export default function CalendarMain() {
  const [calendarPages, setCalendarPages] = useState<any>([]);
  const [currentFifteenDays, setCurrentFifteenDays] = useState<any[]>([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedEvents, setSelectedEvents] = useState<any[]>([]);
  const { isEventPopup, changeEventPopup } = useEventPopup();
  const { isDayPopup, changeDayPopup } = useDayPopup();
  const { getEvents } = EventsAPI();
  const { getUser } = UserAPI();
  const { timetableId } = useParams();
  const [buttonVisibility, setButtonVisibility] = useState<any>({
    prevButton: true,
    nextButton: true,
  });
  const { isMenuOpen, setIsMenuOpen } = useMobileMenu();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = useCallback(async () => {
    try {
      const calendarPages = await getEvents(timetableId);
      setCalendarPages(calendarPages);
    } catch (error) {
      return error;
    }
  }, []);

  useEffect(() => {
    if (!calendarPages) {
      fetchEvents();
    }
    if (calendarPages && calendarPages.calendar) {
      const currentDate = new Date();
      changeCurrentFifteenDays(currentDate);
    }
  }, [calendarPages]);

  const changeCurrentFifteenDays = useCallback(
    (currentDate: Date) => {
      const tempArr: any[] = [];
      const currentDateString = currentDate.toISOString().split("T")[0];

      calendarPages.calendar.forEach((page: any) => {
        let pageDate = new Date(page.date);
        const pageDateString = pageDate.toISOString().split("T")[0];

        if (pageDateString >= currentDateString && tempArr.length < 15) {
          tempArr.push(page);
        }
      });
      setCurrentFifteenDays(tempArr);
    },
    [calendarPages]
  );

  const handleClickPrev = useCallback(() => {
    calendarPages.calendar.filter((page: any, index: number) => {
      if (
        page.date.split("T")[0] === currentFifteenDays[0].date.split("T")[0]
      ) {
        let newCurrentFifteen: any[] = [];

        if (index <= 15) {
          setButtonVisibility({ prevButton: false, nextButton: true });
          newCurrentFifteen = calendarPages.calendar.slice(0, 15);
        } else {
          newCurrentFifteen = calendarPages.calendar.slice(index - 15, index);
          setButtonVisibility({ prevButton: true, nextButton: true });
        }
        setCurrentFifteenDays(newCurrentFifteen);
      }
    });
  }, [calendarPages, currentFifteenDays]);

  const handleClickNext = useCallback(() => {
    calendarPages.calendar.filter((page: any, index: number) => {
      if (
        page.date.split("T")[0] === currentFifteenDays[0].date.split("T")[0]
      ) {
        if (index > calendarPages.calendar.length - 30) {
          setButtonVisibility({ prevButton: true, nextButton: false });
        } else {
          setButtonVisibility({ prevButton: true, nextButton: true });
        }

        const newCurrentFifteen = calendarPages.calendar.slice(
          index + 15,
          index + 30
        );
        setCurrentFifteenDays(newCurrentFifteen);
      }
    });
  }, [calendarPages, currentFifteenDays]);

  const handleEventClick = useCallback((e: React.MouseEvent, event: any) => {
    e.stopPropagation();
    setSelectedEvent(event);
    changeEventPopup(true);
  }, []);

  const handleDayClick = useCallback((e: React.MouseEvent, page: any) => {
    e.stopPropagation();
    if (page.length === 0) return;
    setSelectedEvents(page);
    changeDayPopup(true);
  }, []);

  const assignStyle = useCallback((monthNumber: string) => {
    switch (monthNumber) {
      case "01":
        return "bg-m-1";
        break;
      case "02":
        return "bg-m-2";
        break;
      case "03":
        return "bg-m-3";
        break;
      case "04":
        return "bg-m-4";
        break;
      case "05":
        return "bg-m-5";
        break;
      case "06":
        return "bg-m-6";
        break;
      case "07":
        return "bg-m-7";
        break;
      case "08":
        return "bg-m-8";
        break;
      case "09":
        return "bg-m-9";
        break;
      case "10":
        return "bg-m-10";
        break;
      case "11":
        return "bg-m-11";
        break;
      case "12":
        return "bg-m-12";
        break;
      default:
        return "event-date";
    }
  }, []);

  return (
    <section className="md:h-full">
      <div className="pt-2 w-full relative h-full md:h-full">
        <MenuButton isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        <div
          className={`fixed transform z-50 transition-transform duration-300  ${
            isMenuOpen ? "translate-x-0" : "-translate-x-96"
          }`}>
          {getUser().is_admin ? <AdminNavigation /> : <UserNavigation />}
        </div>
        <div className="relative max-w-1920 mx-auto pt-8 2xl:pt-4 h-full">
          <div className="flex flex-wrap pb-36 md:pb-0 md:mr-2 xl:mr-8">
            <div className="flex w-full flex-wrap md:ml-64 lg:ml-96 md:-mx-2">
              {currentFifteenDays &&
                currentFifteenDays.length > 0 &&
                currentFifteenDays?.map((page: any, pageIndex: number) => {
                  let isUserHasTasks = false;
                  if (page.userIds) {
                    page.userIds.forEach((userId: number) => {
                      if (getUser().user_id === userId) {
                        isUserHasTasks = true;
                      }
                    });
                  }
                  const currentDate = new Date().toISOString().split("T")[0];
                  const day = page.date.split("-")[2].split("T")[0];
                  const monthNumber = page.date.split("-")[1];
                  const style = assignStyle(monthNumber);
                  return (
                    <div
                      key={pageIndex * day + monthNumber}
                      className="flex flex-wrap justify-center w-1/3 md:w-1/5 mt-2 mb-2 px-2">
                      <div
                        onClick={(e) => handleDayClick(e, page.events)}
                        className={`${
                          isUserHasTasks
                            ? "bg-user-has-event special-event-card"
                            : "bg-white event-card"
                        } rounded w-64 h-64 p-2 relative`}>
                        <div key={pageIndex * 100} className="text-2xl">
                          <p className={`${style}`}>
                            {day}.{monthNumber}
                          </p>
                          {page.events.length > 0 &&
                            page.events.slice(0, 3).map((event: any) => {
                              const startTime =
                                event.start_time.split("T")[1].split(":")[0] +
                                ":" +
                                event.start_time.split("T")[1].split(":")[1];
                              return (
                                <div
                                  key={
                                    event.event_name +
                                    event.start_time +
                                    event.event_id
                                  }
                                  onClick={(e) => handleEventClick(e, event)}
                                  className="mt-1 p-1 border-2 bg-white border-red-300 hover:bg-red-300 hover:cursor-pointer">
                                  <p className="text-sm">{event.event_name}</p>
                                  <p>{startTime}</p>
                                </div>
                              );
                            })}
                        </div>
                        {page.date < currentDate && (
                          <div className="absolute bottom-2 right-2">
                            <img
                              src={outdated_icon}
                              alt="dzień z przeszłości"></img>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
            <div
              className={`absolute -bottom-8 left-1/2 -translate-x-1/2  -translate-y-1/2 mx-auto md:left-4 md:translate-x-0 md:mx-0`}>
              {buttonVisibility.prevButton && (
                <button
                  className="w-20 xs:w-24 sm:w-32 px-4 arrow-button"
                  onClick={handleClickPrev}>
                  <img src={arrow} alt=""></img>
                </button>
              )}
              {buttonVisibility.nextButton && (
                <button
                  className="w-20 xs:w-24 sm:w-32 px-4 rotate-180 arrow-button"
                  onClick={handleClickNext}>
                  <img src={arrow} alt=""></img>
                </button>
              )}
            </div>
          </div>
        </div>

        {selectedEvent && (
          <EventDetails
            isEventPopup={isEventPopup}
            changeEventPopup={changeEventPopup}
            event={selectedEvent}
          />
        )}

        {selectedEvents && selectedEvents.length > 0 && (
          <DayDetails
            isDayPopup={isDayPopup}
            changeDayPopup={changeDayPopup}
            events={selectedEvents}
          />
        )}
      </div>
    </section>
  );
}
