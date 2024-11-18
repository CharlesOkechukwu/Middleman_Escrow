import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import AuthBanner from '@/components/auth/AuthBanner';
import AuthForm from '@/components/auth/AuthForm';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import useSignup from '@/hooks/useSignup';


const formSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
  confirm_password: z.string().min(8)
}).refine(data => data.password === data.confirm_password)

const SignUp: React.FC = () => {

  const [showPassword, setShowPassword] = useState(false)
  const [showCfmPwd, setShowCfmPwd] = useState(false)

  const handleTogglePassword = () => {
    setShowPassword(!showPassword)
  }

  const handleToggle = () => {
    setShowCfmPwd(!showCfmPwd)
  }
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: "",
      password: '',
      confirm_password: ''
    },
  })

  const navigate = useNavigate()
  const { register } = useSignup()
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    await register(data)
    navigate('/auth/login')
  };

  return (
    <section className='w-full bg-[#F0F2F5] 2xl:w-[1440px] mx-auto block lg:flex justify-between'>
      <AuthBanner variant='left' />
      <div className='w-full lg:flex-1 px-5 lg:px-16 py-10'>
        <div className='w-full flex items-center justify-end gap-5'>
          <p>have an account? <NavLink to='/auth/login' className='text-pry'>Sign in!</NavLink></p>
        </div>
        <div className='w-full h-full flex justify-center items-center'>
          <section className='h-full lg:h-[559px] w-full lg:w-[500px]'>
            <AuthForm type='sign-up' heading='Get Started With middleman' subHeading='Getting started is easy' />
            <div className='w-full'>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input type='text' placeholder="name" {...field} className='w-full flex items-center h-[50px] rounded-[10px] bg-white border border-grey1 px-3' />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input type='email' placeholder="Email" {...field} className='w-full flex items-center h-[50px] rounded-[10px] bg-white border border-grey1 px-3' />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className='w-full flex items-center h-[50px] rounded-[10px] bg-white border border-grey1 px-3'>
                            <Input
                              type={showPassword ? 'text' : 'password'}
                              placeholder={'Password'}
                              {...field}
                              className='w-full border-none rounded-[10px] h-full bg-white'
                            />

                            <span role='button' className='block' onClick={handleTogglePassword}>
                              {showPassword ?
                                <Eye className='text-[#B8B8B8]' />
                                : <EyeOff className='text-[#B8B8B8]' />

                              }
                            </span>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="confirm_password"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className='w-full flex items-center h-[50px] rounded-[10px] bg-white border border-grey1 px-3'>
                            <Input
                              type={showCfmPwd ? 'text' : 'password'}
                              placeholder={'Confirm Password'}
                              {...field}
                              className='w-full border-none rounded-[10px] h-full bg-white'
                            />

                            <span role='button' className='block' onClick={handleToggle}>
                              {showCfmPwd ?
                                <Eye className='text-[#B8B8B8]' />
                                : <EyeOff className='text-[#B8B8B8]' />

                              }
                            </span>
                          </div>

                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type='submit' className={`rounded-[10px] h-12 w-full  bg-pry text-[#f4f4f4]`}>
                    Create Account
                  </Button>

                  <p className='text-[14px] pt-3 text-center text-[#5A5A5A]'>
                    By continuing you indicate that you read and agreed to the Terms of Use
                  </p>
                </form>
              </Form>
            </div>
          </section>

        </div>
        {/* <p className='text-[14px] text-center text-[#5A5A5A]'>
          By continuing you indicate that you read and agreed to the Terms of Use
        </p> */}
      </div>
    </section>
  );
}

export default SignUp;
