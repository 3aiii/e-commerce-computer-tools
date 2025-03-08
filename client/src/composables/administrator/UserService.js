import { HOST_URL } from "../../secret";
import { get } from "./ProductService";

export const findAll = async () => {
  return await get(`users`);
};

export const findOne = async (id) => {
  return await get(`users/${id}`);
};
