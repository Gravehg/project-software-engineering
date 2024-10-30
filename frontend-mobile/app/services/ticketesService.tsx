import axios, { AxiosResponse } from "axios";
import { SuppTicket } from "@/models/SuppTicket";

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

const ticket_URL = BASE_URL + "/user/";
const ticket_supp_URL = BASE_URL + "/support/";

export const getTickets = async () => {
  try {
    // console.log("ticket_URL: ", ticket_URL + "get-jammer-tickets-movil/" + userId);
    const response = await axios.get(ticket_URL + "get-jammer-tickets");
    return response.data;
  } catch (error) {
    return { success: false, msg: error };
  }
};

export const getSupportTickets = async (): Promise<SuppTicket[]> => {
  try {
    const response: AxiosResponse<SuppTicket[]> = await axios.get(
      ticket_supp_URL + "get-assigned-tickets"
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
