import { HOST_URL } from "../../secret";
import { get } from "../administrator/ProductService";
import axios from "./../../../node_modules/axios/lib/axios";

export const findProductByCategory = async (id) => {
  console.log(id);
  return axios.get(`${HOST_URL}/categories/findProduct/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
};
