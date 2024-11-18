import http from "@/config/axios";
// import axios from "axios";

export const authUrls = {
  LOGIN_URL: '/login',
  REGISTER_URL: '/register',
  LOGOUT: '/logout',
}

const login = async (params: LoginData) => {
  return await http.post(authUrls.LOGIN_URL, params)
}

const register = async (params: RegisterData) => {
  return await http.post(authUrls.REGISTER_URL, params)
}

const logout = async () => {
  return await http.post(authUrls.LOGOUT)
}

const authServices = {
  login,
  register,
  logout
}

export default authServices;