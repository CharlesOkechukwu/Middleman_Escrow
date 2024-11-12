import AuthBanner from '@/components/auth/AuthBanner';
import AuthForm from '@/components/auth/AuthForm';
import React from 'react';
import { NavLink } from 'react-router-dom';

const SignUp: React.FC = () => {
  return (
    <section className='w-full bg-[#F0F2F5] 2xl:w-[1440px] mx-auto block lg:flex justify-between'>
      <AuthBanner variant='left' />
      <div className='w-full lg:flex-1 px-5 lg:px-16 py-10'>
        <div className='w-full flex items-center justify-end gap-5'>
          <p>have an account? <NavLink to='/auth/login' className='text-pry'>Sign in!</NavLink></p>
        </div>
        <div className='w-full h-full flex justify-center items-center'>
          <AuthForm type='sign-up' heading='Get Started With middleman' subHeading='Getting started is easy' />
        </div>
      </div>
    </section>
  );
}

export default SignUp;
