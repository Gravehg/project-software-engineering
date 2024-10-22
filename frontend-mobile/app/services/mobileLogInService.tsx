const BASE_URL  = process.env.BASE_URL;
const authApiUrl: string = BASE_URL + '/auth/mobileLogin';

export const mobileLogin = async (email: string) => {
  try {
    
    const response = await fetch(authApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email}),
    });
    const data = await response.json();
    if (!data.success) {
        return { success: false, msg: data.msg };
    }
    
    return data; 
  } catch (error) {
    return { success: false, msg: error };
  }
};
