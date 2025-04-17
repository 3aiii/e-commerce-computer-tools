import { HOST_URL } from "../../secret";
import axios from "./../../../node_modules/axios/lib/axios";
import { get } from "./../administrator/ProductService";

export const findAll = async (userId, status) => {
  return await get(`reviews/findAll/${userId}?status=${status}`);
};

export const create = async (data) => {
  return await axios.post(`${HOST_URL}/reviews`, data, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
};

export const patchs = async (ReviewId, data) => {
  return await axios.patch(`${HOST_URL}/reviews/patch/${ReviewId}`, data, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
};

export const update = async (id, data) => {
  return await axios.patch(`${HOST_URL}/reviews/${id}?status=${data}`, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  });
};

export const findTop3 = async () => {
  return await get(`reviews/top-3`);
};
