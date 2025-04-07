import { HOST_URL } from "../../secret";
import { get } from "../administrator/ProductService";

export const getValues = async () => {
  return get(`dashboard`);
};

export const getSalesPerDay = async () => {
    return get(`dashboard/OrderPerDaySales`)
}