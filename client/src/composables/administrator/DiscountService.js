import { HOST_URL } from "../../secret";
import { get } from "./ProductService";
import axios from "./../../../node_modules/axios/lib/axios";

export const findAll = async (page, perPage, search) => {
  return await get(`discount`, { page, perPage, search });
};

export const findOne = async (id) => {
  return await get(`discount/${id}`);
};

export const create = async (data) => {
  return await axios.post(`${HOST_URL}/discount`, data, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
};

export const update = async (id, data) => {
  return await axios.patch(`${HOST_URL}/discount/${id}`, data, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
};

export const remove = async (id) => {
  return await axios.delete(`${HOST_URL}/discount/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
};
