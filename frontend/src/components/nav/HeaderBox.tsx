import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import logo from '@/assets/images/logo.svg';
import { Button } from '../ui/button';




interface Props {

}

const HeaderBox: React.FC<Props> = (props) => {

  const { pathname } = useLocation();

  const links = [
    {
      path: '/',
      routeName: 'Home',
      id: '1'
    },
    {
      path: '#',
      routeName: 'features',
      id: '2'
    },
    {
      path: '#',
      routeName: 'about us',
      id: '3'
    },
    {
      path: '#',
      routeName: 'contact',
      id: '4'
    },
  ]

  return (
    <nav className='w-full xl:w-[1197px] mx-auto flex items-center justify-between h-[50px mt-[60px]'>
      <NavLink to='/'>
        <img src={logo} alt="company logo" />
      </NavLink>

      <ul className='flex gap-x-[50px]'>
        {links.map(link => (
          <li key={link.id}>
            <NavLink to={link.path} className={`${link.path === pathname ? 'text-pry' : 'text-pry-black'}`}>
              {link.routeName}
            </NavLink>
          </li>
        ))}
      </ul>

      <div className='flex gap-x-10'>
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
