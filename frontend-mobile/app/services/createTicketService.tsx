import axios from "axios";
const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;
const ticket_URL = BASE_URL + "/ticket/";

export const addTicket = async (category: string, topic: string, text:string) => {
  try {
    const response = await axios.post(`${ticket_URL}add-ticket`, {
      category,
      topic, 
      text,
    });
    return response.data; 
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};