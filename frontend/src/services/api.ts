// import axios from "axios";
// import keycloak from "../keycloak.ts";

// const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

import axios from "axios";
import keycloak from "../keycloak.ts";

const API_BASE_URL =
  (window as any).env?.REACT_APP_API_URL || "http://localhost:3001";

// Utwórz instancję axios
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor do dodawania tokenu do requestów
api.interceptors.request.use(
  (config) => {
    if (keycloak.token) {
      config.headers.Authorization = `Bearer ${keycloak.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor do obsługi odpowiedzi i odświeżania tokenów
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Spróbuj odświeżyć token
        await keycloak.updateToken(30);
        originalRequest.headers.Authorization = `Bearer ${keycloak.token}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Token nie może być odświeżony, przekieruj do logowania
        keycloak.login();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
