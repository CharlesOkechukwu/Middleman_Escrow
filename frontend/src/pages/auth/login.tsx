import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '@/assets/images/logo.svg';
import { Eye, EyeOff } from 'lucide-react';
import AuthForm from '@/components/auth/AuthForm';
import { useForm } from "react-hook-form"
import AuthBanner from '@/components/auth/AuthBanner';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import useLogin from '@/hooks/useLogin';



interface Props {

}

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(7),
})

const LoginPage: React.FC<Props> = (props) => {

  const { login, errorMsg } = useLogin()
  const [showPassword, setShowPassword] = useState(false)

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);

  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: '',
    },
  })

  const navigate = useNavigate();

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    await login(data)
    navigate('/dashboard')
    // console.log(errorMsg);
  };

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
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Email" {...field} className='w-full flex items-center h-[50px] rounded-[10px] bg-white border border-grey1 px-3' />
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
                        <div className='w-full pt-2 flex justify-between items-center'>
                          <div className='flex items-center gap-2'>
                            <Switch className='border-[0.5px] border-[#C9C9C9]' />
                            <Label className='text-xs'>Remember me</Label>
                          </div>
                          <NavLink to='/auth/reset-password' className='text-[14px] text-[#D93F21]'>
                            Recover Password
                          </NavLink>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button variant='outline' type='submit' className={`rounded-[10px] h-12 w-full  border-[#5A5A5A] text-[#5A5A5A] hover:bg-pry hover:text-white hover:border-none bg-inherit`}>
                    Log In
                  </Button>
                </form>
              </Form>
            </div>
          </section>

        </div>
      </aside>
      <AuthBanner variant='right' />
    </section>
  );
}

export default LoginPage;
