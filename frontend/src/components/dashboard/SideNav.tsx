import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '@/assets/images/logo.svg';


interface Props {

}

const SideNav: React.FC<Props> = (props) => {
  return (
    <aside className='w-[218px] h-screen rounded-[20px] bg-white'>
      <NavLink to='/'>
        <img src={logo} alt="company logo" />
      </NavLink>
    </aside>
  );
}

export default SideNav;
