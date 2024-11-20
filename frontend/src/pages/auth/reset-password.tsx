import React from 'react';
import { NavLink } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

// components
import AuthBanner from '@/components/auth/AuthBanner';
import { Button } from '@/components/ui/button';
import { CustomInput } from '@/components/auth/CustomInput';



const schema = z.object({
  password: z.string().min(8),
  confirm_password: z.string().min(8)
}).refine(data => data.password === data.confirm_password, {
  message: 'Passwords do not match',
  path: ['confirm_password'],
})

type FormField = z.infer<typeof schema>

const ResetPassword: React.FC = () => {

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting }
  } = useForm<FormField>({

    resolver: zodResolver(schema)
  })

  const navigate = useNavigate()

  const onSubmit: SubmitHandler<FormField> = async (data) => {
    console.log(data)
    setError('root', {
      message: 'error message from backend'
    })
  }

  return (
    <section className='w-full bg-[#F0F2F5] 2xl:w-[1440px] mx-auto block lg:flex justify-between'>
      <AuthBanner variant='left' />

      <div className='w-full lg:flex-1 px-5 lg:px-16 py-10'>
        <div className='w-full flex items-center justify-end gap-5'>
          <p>Remember password?? <NavLink to='/auth/login' className='text-pry'>Sign in!</NavLink></p>
        </div>
        <div className='w-full h-full flex justify-center pt-[108px]'>
          <div>
            <h4 className='font-semibold text-center text-2xl'>Reset Password</h4>
            <p className='font-normal text-center text-18 pt-2 text-[#7E7E7E]'>Choose a new password to your account</p>

            <div className='pt-[70px]'>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className='mb-[25px]'>
                  <CustomInput
                    placeholder='Your new Password'
                    type='password'
                    {...register('password')}
                    errorMsg={errors.password?.message}
                  />
                </div>
                <div className='mb-[25px]'>
                  <CustomInput
                    placeholder='Confirm new Password'
                    type='password'
                    {...register('confirm_password')}
                    errorMsg={errors.confirm_password?.message}
                  />
                </div>
                <Button className='bg-pry text-[#f4f4f4] rounded-[10px] h-12 w-full'>
                  Create Account
                </Button>

                <Button variant='outline' onClick={() => navigate('/auth/login')} className='border-[#5A5A5A] mt-[25px] text-[#5A5A5A] rounded-[10px] h-12 w-full'>
                  Back to Log In
                </Button>
              </form>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default ResetPassword;
