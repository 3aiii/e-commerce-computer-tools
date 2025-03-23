import { HOST_URL, IMAGE_URL } from "../../secret";
import { get } from "../administrator/ProductService";
import axios from "./../../../node_modules/axios/lib/axios";

export const create = async (data) => {
  return axios.post(
    `${HOST_URL}/carts`,
    { data },
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );
};

export const findAll = async (id) => {
  return get(`carts/findAll/${id}`);
};

export const remove = async (id) => {
  return axios.delete(`${IMAGE_URL}/carts`);
};
