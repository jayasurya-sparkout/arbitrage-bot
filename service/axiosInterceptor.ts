import axios from "axios";

const axiosInstance = axios.create({
    baseURL: `http://13.126.148.9:5006`
});

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            if(config.url) {
                config.headers = config.headers || {};
                config.headers['Content-Type'] = 'application/json; charset=utf-8';
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

export default axiosInstance;