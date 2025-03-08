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

export const findAll = async () => {
  return await get(`products`);
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

export const update = async (data) => {
  return await axios.patch(`${HOST_URL}/products`, data, {
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
