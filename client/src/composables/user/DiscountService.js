import { HOST_URL } from "../../secret";
import { get } from "../administrator/ProductService";
import axios from "./../../../node_modules/axios/lib/axios";

export const findAll = async (page, perPage, search) => {
  return await get(`discount`, { page, perPage, search });
};

export const useCode = async (code) => {
  return await get(`discount/use/${code}`);
};
