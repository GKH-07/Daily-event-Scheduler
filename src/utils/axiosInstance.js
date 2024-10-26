import axios from "axios";
import { BASE_URL } from "./constants";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  if (config.headers["Authorization"]) config.headers["Authorization"] = null;

  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = token;
  }
  return config;
});

// Response interceptor for 401 and 403
axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  async (error) => {
    if (error?.response?.status === 401 || error?.response?.status === 403) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
