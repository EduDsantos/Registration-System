import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL, // sua URL da API
});

// Interceptador para adicionar o token em todas as requisições
// api.interceptors.request.use((config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//         console.log("token recuperado", token)
//     }
//     return config;
// });

export default api;
