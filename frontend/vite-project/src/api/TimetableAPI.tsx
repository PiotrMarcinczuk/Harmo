import useHttp from "../hooks/useHttp";
import { useSelector } from "react-redux";
export default function TimetableAPI() {
  const { http } = useHttp();
  const { userInfo } = useSelector((state: any) => state.auth);

  const createTimeatable = async (name: string) => {
    try {
      const response = await http.post(`auth/admin/create-timetable`, {
        name: name,
        userId: userInfo.user_id,
      });
      return response.data;
    } catch (error) {
      console.error("Error creating timetable:", error);
    }
  };

  const getTimetables = async (userId: number) => {
    try {
      const response = await http.get(`auth/get-timetables/?userId=${userId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching timetables:", error);
    }
  };

  const getTimetable = async (userId: number, timetableId: number) => {
    try {
      const response = await http.get(
        `auth/get-timetable/?userId=${userId}&timetableId=${timetableId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching timetable:", error);
    }
  };

  const getTimetableForCollaborator = async (userId: number) => {
    try {
      const response = await http.get(
        `auth/get-timetables-collaborator/?userId=${userId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching timetable for collaborator:", error);
    }
  };

  return {
    createTimeatable,
    getTimetables,
    getTimetable,
    getTimetableForCollaborator,
  };
}
