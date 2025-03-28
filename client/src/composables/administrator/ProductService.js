import { HOST_URL } from "../../secret";
import axios from "./../../../node_modules/axios/lib/axios";

export const get = async (endpoint, params = {}) => {
  return await axios(`${HOST_URL}/${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
    params,
  });
};

export const findAll = async (page, perPage, search, status) => {
  return await get(`products`, {
    page,
    perPage,
    search,
    status,
  });
};

export const findOne = async (id) => {
  return await get(`products/${id}`);
};

export const create = async (data) => {
  return await axios.post(`${HOST_URL}/products`, data, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
};

export const update = async (id, data) => {
  return await axios.patch(`${HOST_URL}/products/${id}`, data, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
};

export const remove = async (id) => {
  return await axios.delete(`${HOST_URL}/products/${id}`, {
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
    `${HOST_URL}/products/upload/${covertToNumber}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    }
  );
};
