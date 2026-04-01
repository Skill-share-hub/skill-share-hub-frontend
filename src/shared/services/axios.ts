import axios from 'axios'
import { toast } from 'react-hot-toast'
import { getFriendlyErrorMessage } from '../error/friendlyErrorMessages';

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

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
        const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/refresh`, {}, { withCredentials: true });
        if (data.accessToken) {
          localStorage.setItem("token", data.accessToken);
          originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        }
        return api(originalRequest);
      } catch (refreshError) {
        console.log("Session expired");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        if (window.location.pathname !== "/login" && window.location.pathname !== "/register" && window.location.pathname !== "/") {
          window.location.href = "/login";
        }
        return Promise.reject(refreshError);
      }
    }

    // Global Error Handling with Toasts
    const statusCode = error.response?.status;

    const friendlyMessage = statusCode 
  ? getFriendlyErrorMessage(statusCode) 
  : "Check your internet connection and try again.";
if (statusCode !== 401) {
  toast.error(friendlyMessage);
    }
    if (statusCode === 401 && !originalRequest.url?.includes("/users/profile")) {
      toast.error("Session expired");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      if (window.location.pathname !== "/login" && window.location.pathname !== "/register" && window.location.pathname !== "/") {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  })

export default api