import { HOST_URL } from "../../secret";
import { get } from "../administrator/ProductService";
import axios from "./../../../node_modules/axios/lib/axios";

export const create = async (data) => {
  return axios.post(`${HOST_URL}/carts`, data, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
};

export const findAll = async (id) => {
  return get(`carts/findAll/${id}`);
};

export const update = async (id, data) => {
  return axios.patch(`${HOST_URL}/carts/${id}`, data, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
};

export const remove = async (id, delMany) => {
  return axios.delete(`${HOST_URL}/carts/${id}?delMany=${delMany}`, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
};
