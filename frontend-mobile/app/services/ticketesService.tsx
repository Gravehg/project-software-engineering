import axios from 'axios';

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

const ticket_URL = BASE_URL + "/user/";

export const getTickets = async (userId: string) => {
  try {
    console.log("ticket_URL: ", ticket_URL + "get-jammer-tickets-movil/" + userId);
    const response = await axios.get(ticket_URL + "get-jammer-tickets-movil/" + userId );
    return response.data;
  } catch (error) {
    return { success: false, msg: error };
  }
};