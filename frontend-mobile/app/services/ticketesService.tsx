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

// export const getTickets = async (userId: string) => {
//   try {
//     // const response = await axios.get(ticket_URL + "/get-jammer-tickets-movil/" + userId );
//     const response = await fetch(`${ticket_URL}/get-jammer-tickets-movil/${userId}`,
//     {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//     if (!response.ok) {
//         return { success: false, msg: 'An error has occurred while trying to use the method in the backend.' };
//     }
//     const data = await response.json();
//     return data; 
//   } catch (error) {
//     return { success: false, msg: error };
//   }
// };