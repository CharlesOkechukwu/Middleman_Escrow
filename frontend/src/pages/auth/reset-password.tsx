import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

// components
import AuthBanner from '@/components/auth/AuthBanner';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff } from 'lucide-react';



const formSchema = z.object({
  password: z.string().min(8),
  confirmPassword: z.string().min(8)
}).refine(data => data.password === data.confirmPassword)

const ResetPassword: React.FC = () => {

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
      password: '',
      confirmPassword: ''
    },
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log(data)
    console.log(22)
  }

  const navigate = useNavigate();

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
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                    name="confirmPassword"
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

                  <Button className='bg-pry text-[#f4f4f4] rounded-[10px] h-12 w-full'>
                    Create Account
                  </Button>

                  <Button variant='outline' onClick={() => navigate('/auth/login')} className='border-[#5A5A5A] text-[#5A5A5A] rounded-[10px] h-12 w-full'>
                    Back to Log In
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default ResetPassword;
