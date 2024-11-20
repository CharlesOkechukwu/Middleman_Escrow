import React from 'react';
import { Button } from "@/components/ui/button"
import fb from '@/assets/images/fb.svg';
import google from '@/assets/images/google.svg';


type Props = {
  type: 'sign-up' | 'login';
  heading: string;
  subHeading: string;
}



const AuthForm: React.FC<Props> = ({ type, heading, subHeading }) => {

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
    </div>
  );
}

export default AuthForm;
