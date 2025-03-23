import { HOST_URL } from "../../secret";
import axios from "./../../../node_modules/axios/lib/axios";

export const findProductByCategory = async (id, productId, search) => {
  return axios.get(
    `${HOST_URL}/categories/findProduct/${id}?productId=${productId}&search=${search}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );
};
