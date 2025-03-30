import useHttp from "../hooks/useHttp";
import UserAPI from "./UserAPI";
import { type Event } from "../interfaces/app_interfaces";
export default function EventsAPI() {
  const { http } = useHttp();
  const { getUser } = UserAPI();

  const createEvent = async (data: Event) => {
    try {
      const response = await http.post(`auth/admin/create-event`, {
        timetableId: data.timetableId,
        eventName: data.eventName,
        startTime: data.eventStartTime,
        endTime: data.eventEndTime,
        description: data.description,
        isEventGroup: false,
        userId: data.userId,
        assignedUsersId: data.assignedUsersId,
      });
      return response.data;
    } catch (error) {
      console.error("Error creating event:", error);
      return error;
    }
  };

  const getEvents = async (timetableId: any) => {
    try {
      const userId = getUser().user_id;
      const response = await http.get(
        `auth/get-events/?timetableId=${timetableId}&userId=${userId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error getings event:", error);
    }
  };

  const getEventsWithoutCalendar = async (timetableId: any) => {
    try {
      const userId = getUser().user_id;
      const response = await http.get(
        `auth/admin/get-events-list/?timetableId=${timetableId}&userId=${userId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error getings event:", error);
    }
  };

  const getEventForCurrentUser = async (timetableId: any) => {
    try {
      const response = await http.get(
        `auth/get-events-user/?timetableId=${timetableId}&userId=${
          getUser().user_id
        }`
      );
      return response.data;
    } catch (error) {
      console.error("Error getings event for current user:", error);
    }
  };

  const getUpcomingEvents = async (userId: number, timetableId: number) => {
    try {
      const response = await http.get(
        `auth/get-upcoming-events/?userId=${userId}&timetableId=${timetableId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error getings upcoming events:", error);
    }
  };

  const removeEvent = async (userId: number, eventId: number) => {
    try {
      const response = await http.delete(
        `auth/admin/remove-event/?eventId=${eventId}&userId=${userId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error removing event:", error);
      alert("Wystapił błąd podczas usuwania wydarzenia");
    }
  };

  const updateEvent = async (data: any) => {
    try {
      const response = await http.patch(`auth/admin/update-event`, {
        ...data,
        startTime: data.eventStartTime,
        endTime: data.eventEndTime,
        userId: getUser().user_id,
        eventId: data.eventId,
      });
      return response.data;
    } catch (error) {
      console.error("Error updating event:", error);
      return error;
    }
  };

  return {
    createEvent,
    getEvents,
    getEventForCurrentUser,
    getEventsWithoutCalendar,
    removeEvent,
    updateEvent,
    getUpcomingEvents,
  };
}
