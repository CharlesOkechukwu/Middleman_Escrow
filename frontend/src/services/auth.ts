// import http from "@/config/axios";
import axios from "axios";


const API_URL = 'http://127.0.0.1:5000'


export const authUrls = {
  LOGIN_URL: '/login',
  REGISTER_URL: '/register'
}

const login = async (params: LoginData) => {
  return await axios.post(`${API_URL}/login`, params)
}

const register = async (params: RegisterData) => {
  return await axios.post(`${API_URL}/register`, params)
}



const authServices = {
  login,
  register
}

export default authServices;