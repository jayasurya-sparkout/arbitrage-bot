import axiosInstance from "./axiosInterceptor";

export const Login = async (email: string, password: string) => {
  try {
    const formData = new URLSearchParams();
    formData.append("username", email);
    formData.append("password", password);
    console.log('formData', formData.toString());

    const response = await axiosInstance.post('auth/login', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    if (response.data?.access_token) {
      const token = response.data.access_token;

      // Store in localStorage (if you're not using secure cookies)
      localStorage.setItem('accessToken', token);

      // Optionally set for future Axios requests
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    return response;
  } catch (error) {
    throw error;
  }
};
