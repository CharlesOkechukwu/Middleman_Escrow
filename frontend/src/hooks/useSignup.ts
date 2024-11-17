import toast from "react-hot-toast";
import authServices from '@/services/auth';


const useSignup = () => {

  const register = async (param: RegisterData) => {
    try {
      await authServices.register(param)
        .then(res => {
          localStorage.setItem('token', JSON.stringify(res?.data?.access_token))
          toast.success(res.data.message)
          console.log(res)
        })
    } catch (error: any) {
      console.log(error.message)
    }
  }
  return {
    register
  }
}

// twhyte@test.com 1234567@
export default useSignup;
