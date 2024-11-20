import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { Loader } from 'lucide-react';
import { SubmitHandler, useForm } from 'react-hook-form';
import AuthBanner from '@/components/auth/AuthBanner';
import AuthForm from '@/components/auth/AuthForm';
import { CustomInput } from '@/components/auth/CustomInput';
import { Button } from '@/components/ui/button';
import authServices from '@/services/auth';


const schema = z.object({
  name: z.string().min(3, {
    message: 'Full name must contain at least 3 character(s)'
  }),
  email: z.string().email(),
  password: z.string().min(8, {
    message: 'Password must contain at least 8 character(s)'
  }),
  confirm_password: z.string().min(8, {
    message: 'Password must contain at least 8 character(s)'
  })
}).refine(data => data.password === data.confirm_password, {
  message: 'Passwords do not match',
  path: ['confirm_password'],
})

type FormField = z.infer<typeof schema>

const SignUp: React.FC = () => {

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

  const navigate = useNavigate()

  const onSubmit: SubmitHandler<FormField> = async (data) => {
    try {
      await authServices.register(data)
        .then(res => {
          console.log(res)
        })
      navigate('/auth/login')
      // throw new Error()
    } catch (error: any) {
      toast.error(error?.response.data?.message)
      setError('password', {
        message: error?.response.data?.message
      })
      console.log(error.response.data?.message)
    }
  }

  return (
    <section className='w-full bg-[#F0F2F5] 2xl:w-[1440px] mx-auto block lg:flex justify-between h-full'>
      <AuthBanner variant='left' />
      <div className='w-full lg:flex-1 px-5 lg:px-16 py-10 h-full'>
        <div className='w-full flex items-center justify-end gap-5'>
          <p>have an account? <NavLink to='/auth/login' className='text-pry'>Sign in!</NavLink></p>
        </div>
        <div className='w-full h-full flex justify-center items-center pt-[55px]'>
          <section className='h-full lg:h-[559px] w-full md:w-[500px]'>
            <AuthForm type='sign-up' heading='Get Started With middleman' subHeading='Getting started is easy' />
            <div className='w-full'>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className='mb-5'>
                  <CustomInput
                    placeholder='Full Name'
                    type='text'
                    {...register('name')}
                    errorMsg={errors.name?.message}
                  />
                </div>
                <div className='mb-5'>
                  <CustomInput
                    placeholder='Enter Email'
                    type='email'
                    {...register('email')}
                    errorMsg={errors.email?.message}
                  />
                </div>
                <div className='mb-5'>
                  <CustomInput
                    placeholder='Password'
                    type='password'
                    {...register('password')}
                    errorMsg={errors.password?.message}
                  />
                </div>
                <div className='mb-[28px]'>
                  <CustomInput
                    placeholder='Confirm Password'
                    type='password'
                    {...register('confirm_password')}
                    errorMsg={errors.confirm_password?.message}
                  />
                </div>
                <Button type='submit' className={`rounded-[10px] h-[55px] w-full  bg-pry text-[#f4f4f4]`}>
                  {isSubmitting ? <Loader className='animate-spin' /> : 'Create Account'}

                </Button>
                <p className='text-[14px] pt-5 text-center text-[#5A5A5A]'>
                  By continuing you indicate that you read and agreed to the Terms of Use
                </p>
              </form>
            </div>
          </section>

        </div>
      </div>
    </section>
  );
}

export default SignUp;
