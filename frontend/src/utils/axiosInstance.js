import axios from "axios";
import { API_PATHS, BASE_URI } from "./apiPaths.js";

export const instance = axios.create({
  baseURL: BASE_URI,
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-type": "Application/Json",
    Accept: "Application/Json",
  },
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },

  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await axios.get(API_PATHS.AUTH.REFRESH);
        return instance(originalRequest);
      } catch (error) {
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  },
);
