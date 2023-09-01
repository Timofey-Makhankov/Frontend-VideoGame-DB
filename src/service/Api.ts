import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from "axios"
import { ACCESS_TOKEN } from "../constants";

const BASE_URL = "http://localhost:8080/"
export const defaultAxiosInstance: AxiosInstance = axios.create(
    {
        baseURL: BASE_URL
    }
)

defaultAxiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig<any>) => {
        let correctPath: boolean = 
        config.url !== "user/login" && config.url !== "user/register";
        if (localStorage.getItem(ACCESS_TOKEN) !== "" && correctPath){
            config.headers.Authorization = `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`;
        }
        return config
    },
    (error: AxiosError) => {
        return Promise.reject(error)
    }
)