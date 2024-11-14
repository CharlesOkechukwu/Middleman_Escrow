import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import AuthBanner from '@/components/auth/AuthBanner';
import { Button } from '@/components/ui/button';
import logo from '@/assets/images/logo.svg';
import success from '@/assets/images/auth/done.png';


const ResetSuccess: React.FC = () => {

  const navigate = useNavigate();

  return (
    <section className='w-full bg-[#F0F2F5] 2xl:w-[1440px] mx-auto block lg:flex justify-between'>
      <div className='w-full lg:flex-1 px-5 lg:px-16 py-10'>
        <NavLink to='/'>
          <img src={logo} alt="company logo" />
        </NavLink>
        <div className='w-full flex items-center justify-center flex-col pt-[210px]'>
          <img src={success} alt="completed icon" />
          <p className='text-2xl text-center pt-[53px] pb-2'>Password reset successful</p>
          <Button type='submit' onClick={() => navigate('/auth/login')} className={`rounded-[10px] h-12 w-full lg:w-[398px]  bg-pry text-[#f4f4f4]`}>
            Login
          </Button>
        </div>
      </div>
      <AuthBanner variant='right' />
    </section>
  );
}

export default ResetSuccess;
