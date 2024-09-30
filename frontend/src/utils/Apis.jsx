import axios from "axios";

export const userApi = axios.create({
  baseURL: process.env.REACT_APP_URL,
  // baseURL:`http://localhost:4000`
  // baseURL:`https://drive2drive.site`
  // baseURL:`https://drive2drive.onrender.com`
});

export const ownerApi = axios.create({
  baseURL: `${process.env.REACT_APP_URL}/owner`,
  // baseURL:`http://localhost:4000/owner`
  // baseURL:`https://drive2drive.site/owner`
  // baseURL:`https://drive2drive.onrender.com/owner`
});

export const adminApi = axios.create({
  baseURL: `${process.env.REACT_APP_URL}/admin`,
  // baseURL:`http://localhost:4000/admin`
  // baseURL:`https://drive2drive.site/admin`
  // baseURL:`https://drive2drive.onrender.com/admin`
});

userApi.interceptors.request.use(
  (req) => {
    if (localStorage.getItem("token")) {
      req.headers.Authentication = localStorage.getItem("token");
    }
    return req;
  },
  (error) => {
    return Promise.reject(error);
  }
);
ownerApi.interceptors.request.use(
  (req) => {
    if (localStorage.getItem("owner")) {
      req.headers.Authentication = localStorage.getItem("owner");
    }
    return req;
  },
  (error) => {
    return Promise.reject(error);
  }
);

adminApi.interceptors.request.use(
  (req) => {
    if (localStorage.getItem("admin")) {
      req.headers.Authentication = localStorage.getItem("admin");
    }
    return req;
  },
  (error) => {
    return Promise.reject(error);
  }
);
