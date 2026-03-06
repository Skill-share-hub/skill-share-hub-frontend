import axios from 'axios'
import { toast } from 'react-hot-toast'

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (originalRequest.url === "/auth/refresh") {
      return Promise.reject(error);
    }

    // Handle 401 Unauthorized (Token Refresh logic)
    if (
      error.response?.status === 401 && !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        await api.post("/auth/refresh");
        return api(originalRequest);
      } catch (refreshError) {
        console.log("Session expired");
        return Promise.reject(refreshError);
      }
    }

    // Global Error Handling with Toasts
    const message = error.response?.data?.message || error.message || "An unexpected error occurred";
    const statusCode = error.response?.status;

    if (statusCode !== 401) {
      toast.error(message);
    }
    if(statusCode==401){
      toast.error("Session expired");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  })

export default api