import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '@/assets/images/logo.svg';
import AuthForm from '@/components/auth/AuthForm';
import AuthBanner from '@/components/auth/AuthBanner';

interface Props {

}

const LoginPage: React.FC<Props> = (props) => {
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
          <AuthForm type='login' heading='Welcome Back' subHeading='Login into your account' />
        </div>
      </aside>
      <AuthBanner variant='right' />
    </section>
  );
}

export default LoginPage;
