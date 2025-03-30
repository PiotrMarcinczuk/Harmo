import axios from "axios";

import { useCookies } from "react-cookie";
const frontUrl = import.meta.env.VITE_FRONT_URL;
const url = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: url,
  withCredentials: true,
});

export default function useHttp() {
  const [, setCookie, removeCookie] = useCookies([
    "accessToken",
    "currentUser",
  ]);

  const http = axios.create({
    baseURL: url,
    withCredentials: true,
  });

  http.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  http.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const response = await axiosInstance.post(
            `/api/refresh`,
            {},
            { withCredentials: true }
          );
          const { accessToken } = response.data;
          setCookie("accessToken", accessToken, { path: "/" });
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return axios(originalRequest);
        } catch (err) {
          removeCookie("currentUser", { path: "/" });
        }
      }
      return Promise.reject(error);
    }
  );

  return { http, axiosInstance, frontUrl };
}
