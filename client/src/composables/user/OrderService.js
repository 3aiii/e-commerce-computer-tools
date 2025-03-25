import { HOST_URL } from "../../secret";
import { get } from "../administrator/ProductService";
import axios from "./../../../node_modules/axios/lib/axios";

export const create = async (data) => {
  return await axios.post(`${HOST_URL}/orders`, data, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
};

export const image = async (blob, orderId) => {
  const covertToNumber = Number(orderId);
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
