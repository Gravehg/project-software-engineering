import axios from "axios";

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

const ticket_URL = BASE_URL + "/ticket/";
const chat_URL = BASE_URL + "/chat/";
const message_URL = BASE_URL + "/message/";


export const getTicketById = async (ticketID: String) => {
  try {
    const response = await axios.get(`${ticket_URL}getTicketById`, {
      params: { ticketID: ticketID },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching ticket by ID: ", error);
    throw error;
  }
};

export const getChatID = async (ticketID: String) => {
  try {
    const response = await axios.get(`${chat_URL}getChatID`, {
      params: {
        ticketID: ticketID,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching chatID:", error);
    throw error;
  }
};

export const getMessagesByChatID = async (chatID: string) => {
  try {
    const response = await axios.get(`${chat_URL}getMessages`, {
      params: {
        chatID: chatID,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching messages:", error);
    throw error;
  }
};

export const sendMessage = async (userMessage : any) => {
  try {
    const response = await axios.post(`${message_URL}sendMessage`, userMessage);
    return response.data; 
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};


export const updateClosureState = async (ticketID:string, newClosureState:string) => {
  try {
    const response = await axios.put(`${ticket_URL}updateClosureState`, {
      ticketID,
      newClosureState,
    });
    return response.data; 
  } catch (error) {
    console.error("Error updating closure state:", error);
    throw error; 
  }
};

export const updateSupp = async (ticketID:string) => {
  try {
    const response = await axios.put(`${ticket_URL}updateAssignedSupp`, {
      ticketID,
    });
    return response.data; 
  } catch (error) {
    console.error("Error updating support assigned:", error);
    throw error; 
  }
};


