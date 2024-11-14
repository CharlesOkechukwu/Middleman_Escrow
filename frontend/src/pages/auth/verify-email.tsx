import AuthBanner from '@/components/auth/AuthBanner';
import { NavLink } from 'react-router-dom';
import React from 'react';
import { Button } from '@/components/ui/button';
import logo from '@/assets/images/logo.svg';

const VerifyEmail: React.FC = () => {

  return (
    <section className='w-full bg-[#F0F2F5] 2xl:w-[1440px] mx-auto block lg:flex justify-between'>
      <div className='w-full lg:flex-1 px-5 lg:px-16 py-10'>
        <NavLink to='/'>
          <img src={logo} alt="company logo" />
        </NavLink>
        <div className='w-full flex items-center justify-center flex-col pt-[110px]'>
          <div className='pb-[170px]'>
            <h5 className='text-2xl font-semibold text-center'>
              Verify your Email
            </h5>
            <p className='text-center'>
              We have sent a verification email to <br /> mike****l@gmail.com
            </p>
          </div>
          <p className='text-center pt-[53px] pb-2'>
            Didn’t receive the email? Check spam or promotion folder
          </p>
          <Button type='submit' className={`rounded-[10px] h-12 w-full lg:w-[398px]  bg-pry text-[#f4f4f4]`}>
            Resend Email
          </Button>
        </div>
      </div>
      <AuthBanner variant='right' />
    </section>
  );
}

export default VerifyEmail;
