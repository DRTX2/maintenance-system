import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true,
});

// Interceptor para añadir el token a las solicitudes
axiosInstance.interceptors.request.use(
  (config) => {
    // Obtén el token del localStorage
    const token = localStorage.getItem("jwt_token");

    // Si hay token, agrega el encabezado Authorization
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
