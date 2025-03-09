import { HOST_URL } from "../../secret";
import { get } from "./ProductService";
import axios from "./../../../node_modules/axios/lib/axios";

export const create = async (name) => {
  return await axios.post(
    `${HOST_URL}/categories`,
    { name },
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );
};

export const findAll = async (page = 1, perPage = 5, search, status) => {
  return await get(`categories`, {
    page,
    perPage,
    search,
    status,
  });
};

export const findOne = async (id) => {
  return await get(`categories/${id}`);
};

export const remove = async (id) => {
  return await axios.delete(`${HOST_URL}/categories/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
};

export const update = async (id, name) => {
  return await axios.patch(`${HOST_URL}/categories/${id}`, name, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
};
