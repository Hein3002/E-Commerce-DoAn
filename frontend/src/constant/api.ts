import axios from "axios";

export const apiServer = axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: true, //allow sent authenticate
});

apiServer.interceptors.request.use(
    function (config) {
        let token = localStorage.getItem('ACCESS_TOKEN') || '{}';
        config.headers.Authorization = "Bearer " + token;
        return config;
    },
    function (error) {
        return Promise.reject(error);
    },
);

export const apiClient = axios.create({
    baseURL: 'http://localhost:8000',
});