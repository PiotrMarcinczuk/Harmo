import useHttp from "./useHttp";

export default function useRefresh() {
  const { http } = useHttp();
  const refreshJWT = async (user: any) => {
    try {
      const response = await http.post(`auth/refresh`, {
        user: user,
      });
      return response.data;
    } catch (error) {
      return error;
    }
  };
  return { refreshJWT };
}
