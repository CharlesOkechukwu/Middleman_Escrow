import React from 'react';
import image1 from '@/assets/images/auth/login-img.png';
import thumbUp from '@/assets/images/thumb.svg';
import image2 from '@/assets/images/auth/signup-img.png'
import logo from '@/assets/images/logo.svg';
import { NavLink } from 'react-router-dom';

interface Props {
  variant: 'left' | 'right';
}

const AuthBanner: React.FC<Props> = ({ variant }) => {
  return (
    <aside className='w-[619px] h-full hidden lg:block'>
      {
        variant === 'right' ?
          (
            <div className='relative w-full'>
              <img src={image1} alt="" className='block object-contain' />
              <div className='w-[547px] absolute left-1/2 -translate-x-1/2 h-[270px] rounded-[10px] bg-[#FFF2F221] bottom-[49px] py-[42px] px-[37px]'>
                <div className=''>
                  <div className='rounded-[10px] h-10 w-[200px] bg-pry text-[#F4F4F4] flex items-center px-[17px] gap-3'>
                    <img src={thumbUp} alt="thumb up" />
                    Stay Safe
                  </div>
                  <p className='text-white mt-[25px] leading-[33px]'>
                    Today, we create innovative solutions to the challenges that consumers face in both their everyday lives and events.
                  </p>
                </div>
              </div>
            </div>
          )
          : (
            <div className='relative h-full'>
              <img src={image2} alt="" className='block object-cover h-full' />
              <NavLink to='/'>
                <img src={logo} alt="company logo" className='absolute top-[70px] left-[50px]' />
              </NavLink>
            </div>
          )
      }
    </aside>
  );
}

export default AuthBanner;
