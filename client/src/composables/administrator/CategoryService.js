import { HOST_URL } from "../../secret";
import { get } from "./ProductService";

export const findAll = async () => {
  return await get(`categories`);
};
