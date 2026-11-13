import { instance } from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

export const getAdminDashboard = async () => {
  const res = await instance.get(API_PATHS.LINK.ADMIN_DASHBOARD);
  return res.data;
};

export const getAdminUsers = async () => {
  const res = await instance.get(API_PATHS.LINK.GET_USERS);
  return res.data;
};