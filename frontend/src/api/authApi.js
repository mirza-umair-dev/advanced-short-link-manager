import { API_PATHS } from "../utils/apiPaths.js";
import { instance } from "../utils/axiosInstance.js";

export const signUp = async (data) =>
  await instance.post(API_PATHS.AUTH.SIGN_UP, data);

export const signIn = async (data) =>
  await instance.post(API_PATHS.AUTH.SIGN_IN, data);

export const logout = async () =>
  await instance.post(API_PATHS.AUTH.SIGN_OUT);

export const getProfile = async () =>
  await instance.get(API_PATHS.AUTH.MY_PROFILE);