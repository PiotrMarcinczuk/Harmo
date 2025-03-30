import { LoginData, RegisterData } from "../interfaces/app_interfaces";
import { useNavigate, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import useHttp from "../hooks/useHttp";
export default function UserAPI() {
  const [cookies, setCookie] = useCookies(["currentUser"]);
  const { http, axiosInstance } = useHttp();
  const navigate = useNavigate();
  const { timetableId } = useParams();

  const registerUser = async (data: RegisterData) => {
    try {
      const response = await axiosInstance.post(`api/register`, {
        name: data.name,
        email: data.email,
        dateOfBirth: data.dateOfBirth,
        password: data.password,
        surname: data.surname,
        nickname: data.nickname,
        phone: data.phone,
        repeatPassword: data.repeatPassword,
        timetableId: data.timetableId,
      });
      return response.data;
    } catch (error) {
      console.error("Error registering user:", error);
      return error;
    }
  };

  const registerCollaborator = async (data: RegisterData) => {
    try {
      const response = await http.post(`auth/admin/create-collaborator`, {
        name: data.name,
        email: data.email,
        dateOfBirth: data.dateOfBirth,
        password: data.password,
        surname: data.surname,
        nickname: data.nickname,
        phone: data.phone,
        repeatPassword: data.repeatPassword,
        timetableId: data.timetableId,
        userId: data.userId,
      });
      return response;
    } catch (error) {
      console.error("Error registering collaborator:", error);
      return error;
    }
  };

  const setUser = async (user: any) => {
    if (!user) return;
    setCookie("currentUser", user, {
      path: "/",
      maxAge: 360000,
    });
  };

  const getUser = () => {
    if (cookies["currentUser"]) return cookies["currentUser"];
  };

  const getCollaborators = async (timetableId: number): Promise<any> => {
    try {
      const response = await http.get(
        `auth/get-collaborators/?timetableId=${timetableId}&userId=${
          getUser().user_id
        }`
      );

      return response;
    } catch (error) {
      console.error("Error fetching collaborators:", error);
    }
  };

  const getCollaboratorsForEvent = async (eventId: number) => {
    try {
      const response = await http.get(
        `auth/get-collaborators-for-event/?eventId=${eventId}&userId=${
          getUser().user_id
        }&timetableId=${timetableId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching collaborators for event:", error);
    }
  };

  const loginUser = async (data: LoginData) => {
    try {
      const response = await axiosInstance.post(`api/login`, {
        email: data.email,
        password: data.password,
      });
      return response.data;
    } catch (error) {
      console.error("Error logging in user:", error);
      return error;
    }
  };

  const logout = async () => {
    try {
      const response = await http.post(`auth/logout`, {
        userId: getUser().user_id,
      });
      console.log(response);
      if (response) navigate("/");
    } catch (error) {
      console.error("Error logging out user:", error);
      alert("Wystąpił błąd podczas wylogowywania");
    }
  };

  const removeUser = async (userId: number, removedUserId: number) => {
    try {
      const response = await http.delete(`auth/admin/remove-user`, {
        data: {
          userId,
          timetableId,
          removedUserId,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error removing user:", error);

      return error;
    }
  };

  const updateUser = async (data: RegisterData) => {
    try {
      const response = await http.patch(`auth/update-user`, {
        ...data,
        userId: getUser().user_id,
        assignedUserId: data.assignedUserId,
      });

      return response;
    } catch (error) {
      console.error("Error updating user:", error);
      return error;
    }
  };

  const updateYourself = async (data: RegisterData) => {
    try {
      const response = await http.patch(`auth/update-user`, {
        ...data,
        userId: getUser().user_id,
        assignedUserId: getUser().user_id,
      });
      return response;
    } catch (error) {
      console.error("Error updating user:", error);
      return error;
    }
  };

  const getUserById = async (targetUserId: number) => {
    try {
      const response = await http.get(
        `auth/admin/get-user-by-id/?userId=${
          getUser().user_id
        }&targetUserId=${targetUserId}`
      );
      return response;
    } catch (error) {
      console.error("Error fetching user by id:", error);
    }
  };

  const addColaborator = async (email: string, timetableId: number) => {
    try {
      const response = await http.post(`auth/admin/add-user-to-timetable`, {
        userId: getUser().user_id,
        timetableId: timetableId,
        email: email,
      });
      return response;
    } catch (error) {
      console.error("Error adding colaborator:", error);
      return error;
    }
  };

  return {
    registerUser,
    loginUser,
    setUser,
    getUser,
    logout,
    getCollaborators,
    getUserById,
    registerCollaborator,
    removeUser,
    updateUser,
    getCollaboratorsForEvent,
    updateYourself,
    addColaborator,
  };
}
