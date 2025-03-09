import { HOST_URL } from "../../secret";
import { get } from "./ProductService";
import axios from "./../../../node_modules/axios/lib/axios";

export const findAll = async (page, perPage, search) => {
  return await get(`users`, { page, perPage, search });
};

export const findOne = async (id) => {
  return await get(`users/${id}`);
};

export const create = async (data) => {
  return await axios.post(`${HOST_URL}/users`, data, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
};

export const image = async (blob, userId) => {
  const covertToNumber = Number(userId);
  const formData = new FormData();
  formData.append("image", blob);

  return await axios.post(
    `${HOST_URL}/users/upload/${covertToNumber}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    }
  );
};

export const remove = async (id) => {
  return await axios.delete(`${HOST_URL}/users/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
};
