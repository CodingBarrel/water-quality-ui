import axios from "axios";

export const baseApi = axios.create({
  baseURL: "http://localhost:3001",
  timeout: 5000,
});

// Request logger
baseApi.interceptors.request.use((config) => {
  console.log(
    `📤 [${config.method?.toUpperCase()}] ${config.url}`,
    config.data || ""
  );
  return config;
});

// Response logger
baseApi.interceptors.response.use(
  (response) => {
    console.log(
      `✅ [${response.config.method?.toUpperCase()}] ${response.config.url}`,
      response.status
    );
    return response;
  },
  (error) => {
    const { config, response } = error;
    const status = response?.status;
    const message = response?.data || error.message;

    console.warn(
      `❌ [${config?.method?.toUpperCase()}] ${config?.url} → ${status}`,
      message
    );
    return Promise.reject(error);
  }
);
