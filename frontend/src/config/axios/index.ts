import axios, { AxiosInstance } from "axios";
import { addTokenInterceptor } from "./interceptor";
// import Authorization from "@/lib/authorization";

// const authorization = new Authorization();


const http: AxiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:5000',//import.meta.env.API_URL,
  // withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
})


http.interceptors.request.use(addTokenInterceptor)

export default http