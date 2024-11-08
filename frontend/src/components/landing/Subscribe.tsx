import React from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

interface Props {

}

const Subscribe: React.FC<Props> = (props) => {
  return (
    <section className='w-full px-5 xl:px-0'>
      <section className="w-full bg-[url('@/assets/images/sub-bg.png')] bg-cover bg-no-repeat lg:w-[900px] xl:w-[1296px] mt-[64px] h-[500px] xl:h-[318px] mx-auto px-5 xl:px-0 flex items-center justify-center bg-pry rounded-[20px]" >

        <div className='w-[822px] mx-auto lg:h-[158px] flex flex-col justify-between'>
          <h5 className='text-white text-center font-semibold text-2xl xl:text-[42px]'>
            Subscribe to our newsletter
          </h5>

          <div className='flex mt-9 lg:mt-0 w-full flex-wrap justify-between  gap-4 lg:flex-nowrap'>
            <Input type='text' placeholder='First name' className='border-[#D4D4D8] h-14  w-full lg:w-[270px] rounded-[9px] text-gray' />

            <Input type='email' placeholder='Email address' className='border-[#D4D4D8] h-14  w-full lg:w-[270px] rounded-[9px] text-gray' />

            <Button className='w-full lg:w-[256px] font-semibold h-14  bg-[#191D23] rounded-[9px] text-white'>
              Subscribe Now
            </Button>
          </div>
        </div>

      </section >
    </section>
  );
}

export default Subscribe;
