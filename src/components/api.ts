import axios from "axios";
export const URL_FIX_BASE_PATH = "http://localhost:9191";
const api = axios.create({ baseURL: URL_FIX_BASE_PATH });

api.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = `Bearer ${localStorage.getItem(
      "accessToken"
    )}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
