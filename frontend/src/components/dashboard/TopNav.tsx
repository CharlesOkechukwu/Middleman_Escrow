import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '../ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import ava from '@/assets/images/auth/ava.png';
import chev from '@/assets/images/chev-down.svg';


interface Props {

}

const TopNav: React.FC<Props> = (props) => {
  return (
    <header className='h-[100px] bg-[#F4F4F4] w-full px-[30px]'>
      <nav className='h-full w-full flex items-center pl-[250px] justify-between'>
        <div className='w-full lg:w-[330px] flex items-center h-[50px] rounded-[30px] bg-white border border-grey1 pl-3 pr-5'>
          <Input
            placeholder='Search...'
            className='w-full h-full border-none rounded-[30px]'
          />
          <Search size={20} className='text-[#6F757E]' />
        </div>

        <div className='flex items-center gap-x-5 pr-3'>
          <Avatar className='bg-white'>
            <AvatarImage src={ava} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <p>Mike Obinna</p>
          <button className='bg-inherit'>
            <img src={chev} alt="" />
          </button>
        </div>
      </nav>
    </header>
  );
}

export default TopNav;
