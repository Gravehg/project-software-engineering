import axios, { AxiosResponse } from "axios";
import { Category } from "@/models/Category";

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

const support_URL = BASE_URL + "/support/";

export const getSupportCategories = async (): Promise<Category[]> => {
  try {
    const response: AxiosResponse<Category[]> = await axios.get(
      support_URL + "get-support-categories"
    );
    return response.data;
  } catch {
    return [];
  }
};
