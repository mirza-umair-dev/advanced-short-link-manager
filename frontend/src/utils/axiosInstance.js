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
    console.log("Interceptor triggered");

    const originalRequest = error.config;

     console.log(error.response?.status);
    console.log(originalRequest.url);

    if (error.response?.status === 401 && !originalRequest._retry &&  originalRequest.url !== API_PATHS.AUTH.REFRESH) {
      console.log("Refreshing token...");

      originalRequest._retry = true;
      try {
        await instance.post(API_PATHS.AUTH.REFRESH);
console.log("Refresh Success");

        return instance(originalRequest);
      } catch (error) {
        console.log("Refresh Failed", error.response);


        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  },
);
