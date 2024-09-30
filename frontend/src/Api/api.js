import axios from "axios";
import { userApi } from "../utils/Apis";

const baseURL = "http://localhost:4000";

const api = axios.create({ baseURL });

const manageInterceptorsAtRequest = (config) => {
  console.log("token", localStorage.getItem("token"));
  config.headers.Authorization = `${localStorage.getItem("token")}`;
  return config;
};

api.interceptors.request.use(manageInterceptorsAtRequest, (error) => {
  return Promise.reject(error);
});

export const registerUser = (user) => {
  return userApi.post("/register", user);
};

export const loginUser = (user) => {
  return userApi.post("/login", user);
};

export const googleLogin = (data) => {
  return userApi.post("/google/login", data);
};

export const getAllVehicles = (searchQuery, sort, category, segment, type) => {
  return userApi.get(
    `/list-all-vehicle?searchQuery=${searchQuery}&sort=${sort}&category=${category}&segment=${segment}&type=${type}`
  );
};
