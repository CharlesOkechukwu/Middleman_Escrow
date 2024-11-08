import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import logo from '@/assets/images/logo.svg';
import { Button } from '../ui/button';
import MobileNav from './MobileNav';
import { links } from '@/constant/links';




interface Props {

}

const HeaderBox: React.FC<Props> = (props) => {

  const { pathname } = useLocation();

  return (
    <nav className='w-full px-5 xl:px-0 lg:w-[900px] xl:w-[1197px] mx-auto flex items-center justify-between h-[50px mt-[60px]'>
      <NavLink to='/'>
        <img src={logo} alt="company logo" />
      </NavLink>

      <div className='block xl:hidden'>
        <MobileNav />
      </div>

      <ul className='hidden xl:flex gap-x-[50px]'>
        {links.map(link => (
          <li key={link.id}>
            <NavLink to={link.path} className={`capitalize ${link.path === pathname ? 'text-pry font-semibold' : 'text-pry-black font-normal'}`}>
              {link.routeName}
            </NavLink>
          </li>
        ))}
      </ul>

      <div className='hidden xl:flex gap-x-10'>
        <Button className='rounded-[7px] w-[161px]'>
          Buy Now
        </Button>
        <Button variant='outline' className='rounded-[7px] w-[161px] text-pry'>
          <NavLink to='#'>
            Sign Up
          </NavLink>
        </Button>
      </div>
    </nav>
  );
}

export default HeaderBox;
