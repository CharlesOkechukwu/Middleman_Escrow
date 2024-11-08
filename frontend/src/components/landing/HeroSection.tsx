import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';
import heroImage from '@/assets/images/secure-asset.png';
import { NavLink } from 'react-router-dom';



const HeroSection: React.FC = () => {
  return (
    <section className='flex w-full gapx-x-[27px] justify-center xl:justify-between h-[516px]'>
      <aside className='w-full lg:w-[742px] h-full'>
        <div>
          <h1 className='text-pry text-center xl:text-start font-semibold text-xl lg:text-[70px] lg:leading-[84px] lg:tracking-tighter'>
            Empower Your Business with Secure Transactions
          </h1>
          <p className='pt-5 w-full lg:w-[644px] text-center xl:text-start'>
            Join a community of buyers and sellers with a seamless, <br className='hidden lg:block' /> safe, and easy-to-use platform to manage your orders <br className='hidden lg:block' /> and payments.
          </p>
        </div>
        <div className='mt-[73px] flex flex-col gap-3 lg:flex-row w-full justify-center xl:justify-start items-center lg:items-start'>
          <NavLink to='#' className='flex w-[234px] h-[45px] lg:h-[55px] lg:text-xl bg-pry text-white items-center justify-center gap-x-3 rounded-md'>
            <span className='font-semibold'>
              Sign Up Now
            </span>
            <ChevronRight className='block text-xl' size={30} />
          </NavLink>
          <Button className='w-[234px] h-[55px] lg:text-xl font-semibold bg-white text-pry'>
            Learn More
          </Button>
        </div>
      </aside>

      <aside className='h-full hidden xl:flex items-center'>
        <img src={heroImage} alt="secured asset" />
      </aside>
    </section>
  );
}

export default HeroSection;
