import { HOST_URL } from "../../secret";
import { get } from "../administrator/ProductService";
import axios from "./../../../node_modules/axios/lib/axios";

export const findProductByCategory = async (id, productId) => {
  return axios.get(
    `${HOST_URL}/categories/findProduct/${id}?productId=${productId}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );
};
