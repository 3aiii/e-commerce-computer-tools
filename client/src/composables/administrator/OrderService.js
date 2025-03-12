import { HOST_URL } from "../../secret";
import axios from "./../../../node_modules/axios/lib/axios";
import { get } from "./ProductService";

export const findAll = async (page, perPage, search) => {
  return await get(`orders`, {
    page,
    perPage,
    search,
  });
};

export const findOne = async (id) => {
  return await get(`orders/${id}`);
};

export const create = async (data) => {
  return await axios.post(`${HOST_URL}/orders`, data, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
};

export const update = async (id, data) => {
  return await axios.patch(`${HOST_URL}/orders/${id}`, data, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
};

export const remove = async (id) => {
  return await axios.delete(`${HOST_URL}/orders/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
};

export const image = async (blob, productId) => {
  const covertToNumber = Number(productId);
  const formData = new FormData();
  formData.append("image", blob);

  return await axios.post(
    `${HOST_URL}/orders/upload/${covertToNumber}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    }
  );
};
