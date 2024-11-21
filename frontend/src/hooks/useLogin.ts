import toast from "react-hot-toast";
import { useAuth } from '@/context/AuthContext';
import authServices from '@/services/auth';

type LoginData = {
  email: string;
  password: string;
}

const useLogin = () => {
  const { setIsAuthenticated } = useAuth()

  const login = async (params: LoginData) => {
    try {
      // setErrorMsg('')
      await authServices.login(params)
        .then(res => {
          if (res.status === 200) {
            localStorage.setItem('token', JSON.stringify(res?.data?.access_token))
            setIsAuthenticated(true)
            toast.success(res.data.message)
            console.log(res)
          }

        })
    } catch (error: any) {
      console.log(error.response.data.message)
      toast.error(error.response.data.message)
    }
  }

  return {
    login,

  }
}

export default useLogin;
