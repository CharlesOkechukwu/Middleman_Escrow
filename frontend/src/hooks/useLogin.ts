import { useState } from 'react';
import toast from "react-hot-toast";
import { useAuth } from '@/context/AuthContext';
import authServices from '@/services/auth';

type LoginData = {
  email: string;
  password: string;
}

const useLogin = () => {
  const { setIsAuthenticated } = useAuth()
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const login = async (params: LoginData) => {
    try {
      setErrorMsg(null)
      await authServices.login(params)
        .then(res => {
          // if (res.status === 200) {
          localStorage.setItem('token', JSON.stringify(res?.data?.access_token))
          setIsAuthenticated(true)
          toast.success(res.data.message)
          console.log(res)
          // }

        })
    } catch (error: any) {
      // setErrorMsg(error?.response || 'Error in login detail')
      console.log(error.name)
      // toast.error(error.response)
      // throw new Error(error.message || "Failed to log in");
      // console.log(error.message)
    }
  }

  return {
    login,
    errorMsg
  }
}

export default useLogin;
