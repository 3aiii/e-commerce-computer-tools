import { HOST_URL } from "../../secret";
import axios from "./../../../node_modules/axios/lib/axios";

export const login = async (data) => {
  return await axios.post(`${HOST_URL}/auth/login`, data, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
};

export const logout = async () => {
  return await axios.post(
    `${HOST_URL}/auth/logout`,
    {},
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );
};

export const verify = async () => {
  return await axios.get(`${HOST_URL}/auth/verify`, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
};
