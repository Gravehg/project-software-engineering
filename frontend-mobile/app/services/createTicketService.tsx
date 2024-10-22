
const BASE_URL  = process.env.BASE_URL;
const ticketApiUrl: string = BASE_URL + '/ticket/add-ticket';

export const createTicket = async (category: string, topic: string, message:string) => {
  try {
    const response = await fetch(ticketApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ category, topic, message }),
    });
    if (!response.ok) {
        return { success: false, msg: 'An error has occurred while trying to use the method in the backend.' };
    }
    const data = await response.json();
    return data; 
  } catch (error) {
    return { success: false, msg: error };;
  }
};
