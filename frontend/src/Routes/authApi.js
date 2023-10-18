import axios from "axios";

export const signUpUser = async (user) => {
  return await axios.post(process.env.REACT_APP_URL + "/signup", { user });
};

export const loginApi = async (users) => {
  return await axios.post(process.env.REACT_APP_URL + "/login", { users });
};

