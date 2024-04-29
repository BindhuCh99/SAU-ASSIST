import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

interface AxiosClient extends AxiosInstance {
    // Define any additional methods or properties specific to your axiosClient
}

const axiosClient: AxiosClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

axiosClient.interceptors.request.use((config: AxiosRequestConfig) => {
    const token = localStorage.getItem("ACCESS_TOKEN");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

axiosClient.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    (error) => {
        try {
            const { response } = error;
            if (response && response.status === 401) {
                localStorage.removeItem("ACCESS_TOKEN");
                // Handle unauthorized access
            }
        } catch (err) {
            console.error(err);
        }
        throw error;
    }
);

export default axiosClient;
