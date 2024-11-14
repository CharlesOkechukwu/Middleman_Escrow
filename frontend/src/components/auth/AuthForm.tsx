import React, { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form";
import fb from '@/assets/images/fb.svg';
import google from '@/assets/images/google.svg';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { NavLink } from 'react-router-dom';
import { authFormSchema } from '@/lib/utils';
import CustomInput from './CustomInput';

type Props = {
  type: 'sign-up' | 'login';
  heading: string;
  subHeading: string;
}



const AuthForm: React.FC<Props> = ({ type, heading, subHeading }) => {

  const formSchema = authFormSchema(type)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: '',
      fullName: type === 'sign-up' ? '' : undefined,
      confirmPassword: type === 'sign-up' ? '' : undefined,
    },
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log(`${type === 'login' ? 'Login data' : 'Sign-up data'}:`, data);
  };

  return (
    <div className='w-full mt-8 xl:mt-0'>
      <h2 className={`font-semibold text-center ${type === 'sign-up' ? 'text-2xl' : 'text-2xl lg:text-4xl'}`}>{heading}</h2>
      <p className='font-normal text-center text-18 pt-2 text-[#7E7E7E]'>
        {subHeading}
      </p>

      <div className='w-full mt-[38px] flex justify-center gap-[14px] items-center'>
        <Button variant='outline' className='w-[126px] h-[43px] bg-white border-pry'>
          <img src={google} alt="google logo" />
        </Button>
        <Button variant='outline' className='border-grey1 bg-white w-[126px] h-[43px]'>
          <img src={fb} alt="facebook logo" />
        </Button>
      </div>

      <div className='w-full flex items-center justify-between my-10'>
        <i className='block w-20 md:w-[120px] lg:w-[165px] h-px bg-grey1' />
        <p className='font-normal text-[13px]'>Or continue with</p>
        <i className='block w-20 md:w-[120px] lg:w-[165px] h-px bg-grey1' />
      </div>
      {/* <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {
            type === 'login' ?
              (
                <>
                  <div>
                    <CustomInput name='email' placeholder='Email' type='email' control={form.control} />
                  </div>
                  <div>
                    <CustomInput name='password' placeholder='Password' type='password' control={form.control} />
                    <div className='w-full pt-2 flex justify-between items-center'>
                      <div className='flex items-center gap-2'>
                        <Switch className='border-[0.5px] border-[#C9C9C9]' />
                        <Label className='text-xs'>Remember me</Label>
                      </div>
                      <NavLink to='/auth/reset-password' className='text-[14px] text-[#D93F21]'>
                        Recover Password
                      </NavLink>
                    </div>
                  </div>
                </>
              )
              : (
                <>
                  <div>
                    <CustomInput
                      name='fullName'
                      placeholder='Full Name'
                      type='text'
                      control={form.control}
                    />
                  </div>

                  <div>
                    <CustomInput name='email' placeholder='Enter Email' type='email' control={form.control} />
                  </div>

                  <div>
                    <CustomInput name='password' placeholder='Password' type='password' control={form.control} />
                  </div>
                  <div>
                    <CustomInput name='confirmPassword' placeholder='Confirm Password' type='password' control={form.control} />
                  </div>
                </>
              )
          }

          <Button variant='outline' type='submit' className={`rounded-[10px] h-12 w-full  ${type === 'login' ? 'border-[#5A5A5A] text-[#5A5A5A] hover:bg-pry hover:text-white hover:border-none bg-inherit' : 'bg-pry text-[#f4f4f4]'}`}>
            {type === 'login' ? 'Log In' : 'Create Account'}
          </Button>
        </form>
      </Form> */}
    </div>
  );
}

export default AuthForm;
