import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";


const apiClient: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_EXTERNAL_API_BASE_URL || undefined,
    headers: {
        'Content-Type': 'application/json',
        language: 'en',
    },
});

apiClient.interceptors.response.use(
    (response: AxiosResponse) => {
        if (response.status < 200 || response.status >= 300) {

            console.error("API non-200 response", {
                url: response.config?.url,
                method: response.config?.method,
                status: response.status,
                statusText: response.statusText,
            });
        }
        return response;
    },
    (error: AxiosError) => {
        if (error.response) {
            console.log("error occured in response axios")

            console.log(error?.response?.data)
            console.error("API error response", {
                url: error.config?.url,
                method: error.config?.method,
                status: error.response.status,
                statusText: error.response.statusText,
                data: error.response.data,
            });
        } else {
            console.log("error occured in response axios")
            console.error("API request error", {
                message: error.message,
                url: error.config?.url,
                method: error.config?.method,
            });
        }
        return Promise.reject(error);
    }
);

export default apiClient;


