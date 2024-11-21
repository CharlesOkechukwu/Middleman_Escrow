import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Loader } from 'lucide-react';
import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import logo from '@/assets/images/logo.svg';
import AuthForm from '@/components/auth/AuthForm';
import AuthBanner from '@/components/auth/AuthBanner';
import { z } from 'zod';
import useLogin from '@/hooks/useLogin';
import { CustomInput } from '@/components/auth/CustomInput';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';




const schema = z.object({
  email: z.string().email(),
  password: z.string().min(7, {
    message: 'Password must be at least 8 character(s)'
  })
})

type FormField = z.infer<typeof schema>

const LoginPage: React.FC = () => {

  const { login } = useLogin()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting }
  } = useForm<FormField>({
    defaultValues: {
      email: ''
    },
    resolver: zodResolver(schema)
  })

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormField> = async (data) => {
    await login(data)
    navigate('/dashboard')
    // throw new Error()
  }


  return (
    <section className='w-full bg-[#F0F2F5] 2xl:w-[1440px] mx-auto block lg:flex justify-between'>
      <aside className='w-full lg:flex-1 px-5 lg:px-16 py-10'>
        <div className='w-full flex justify-between items-center flex-wrap gap-5'>
          <NavLink to='/'>
            <img src={logo} alt="logo" />
          </NavLink>
          <p>Don’t have an account? <NavLink to='/auth/sign-up' className='text-pry'>Sign up!</NavLink></p>
        </div>

        <div className='w-full h-full flex justify-center items-center'>
          <section className='h-[559px] w-full lg:w-[500px]'>
            <AuthForm type='login' heading='Welcome Back' subHeading='Login into your account' />
            <div className='w-full'>
              <form onSubmit={handleSubmit(onSubmit)} className=''>
                <div className='mb-[38px]'>
                  <CustomInput
                    placeholder='Email'
                    type='email'
                    {...register('email')}
                    errorMsg={errors.email?.message}
                  />
                </div>
                <div className='mb-4'>
                  <CustomInput
                    placeholder='Password'
                    type='password'
                    {...register('password')}
                    errorMsg={errors.password?.message}
                  />

                </div>
                <div className='w-full pt-2 flex justify-between items-center'>
                  <div className='flex items-center gap-2'>
                    <Switch className='border-[0.5px] border-[#C9C9C9]' />
                    <Label className='text-xs'>Remember me</Label>
                  </div>
                  <NavLink to='/auth/reset-password' className='text-[14px] text-[#D93F21]'>
                    Recover Password
                  </NavLink>
                </div>

                <Button variant='outline' type='submit' className={`rounded-[10px] h-[52px] text-18 w-full  border-[#5A5A5A] mt-[38px] text-[#5A5A5A] hover:bg-pry hover:text-white hover:border-none bg-inherit`}>
                  {isSubmitting ? <Loader className='animate-spin' /> : ' Log In'}
                </Button>
              </form>

            </div>
          </section>

        </div>
      </aside>
      <AuthBanner variant='right' />
    </section>
  );
}

export default LoginPage;
