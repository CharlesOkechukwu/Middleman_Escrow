import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import logo from '@/assets/images/logo.svg';
import { navLinks } from '@/constant/dashboard-link';
import SideNavItem from './SideNavItem';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import NavIcon from './NavIcon';
import authServices from '@/services/auth';
import toast from 'react-hot-toast';


interface Props {

}

const SideNav: React.FC<Props> = (props) => {

  const { pathname } = useLocation();
  const navigate = useNavigate()
  const links = [
    {
      id: '1',
      name: 'Home',
      icon: 'home',
      dropdown: true,
      children: [
        {
          path: '#',
          name: 'dashboard',
          id: '1'
        },
        {
          path: '#',
          name: 'sales',
          id: '2'
        },
      ]
    },
    {
      id: '2',
      name: 'Pages',
      icon: 'pages',
      dropdown: true,
      children: [
        {
          path: '#',
          name: 'profile',
          id: '1',
          dropdown: true,
        },
        {
          path: '#',
          name: 'users',
          id: '2',
          dropdown: true,
          children: [
            {
              id: '3',
              name: 'all users',
              path: '#'
            },
            {
              id: '4',
              name: 'add users',
              path: '#'
            },
          ]
        },
      ]
    },
  ]

  const handleLogout = async () => {
    localStorage.removeItem('token')
    await authServices.logout()
    navigate('/auth/login')
  }
  return (
    <aside className='w-[218px] h-[821px] rounded-[20px] bg-white sticky top-5'>
      <div className='w-full h-full relative'>
        <NavLink to='/' className='pt-[76px] flex justify-center w-full'>
          <img src={logo} alt="company logo" />
        </NavLink>
        <ul className='pt-[33px]'>
          <li className='px-5'>
            <Accordion type="single" collapsible>
              <AccordionItem value='item-1' className='border-none py-3'>
                <AccordionTrigger className='py-0 text-[16px] font-normal'>
                  <div className='flex gap-x-2.5 items-center pb-1'>
                    <NavIcon icon={'home'} />
                    <h5 className='capitalize'>
                      Home
                    </h5>
                  </div>
                </AccordionTrigger>
                <AccordionContent className='pl-9 pt-2'>
                  <NavLink to='/dashboard' className={`block py-5 text-[16px] ${pathname === '/dashboard' ? 'text-white' : 'text-[#94C1F3F0]'}`}>
                    Dashboard
                  </NavLink>
                  <NavLink to='#' className={`block py-5 text-[16px] ${pathname === 'dashboard' ? 'text-white' : 'text-[#94C1F3F0]'}`}>
                    Sales
                  </NavLink>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value='item2' className='border-none py-3'>
                <AccordionTrigger className='py-0 text-[16px] font-normal'>
                  <div className='flex gap-x-2.5 items-center pb-1'>
                    <NavIcon icon={'pages'} />
                    <h5 className='capitalize'>
                      Pages
                    </h5>
                  </div>
                </AccordionTrigger>
                <AccordionContent className='pl-7 pt-2'>
                  Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </li>
          {navLinks.map(item => (
            <li key={item.id} className='px-5 py-4'>
              <SideNavItem
                name={item.name}
                path={item.path!}
                dropdown={item.dropdown}
                icon={item.icon}
                id={item.id}
              />
            </li>
          ))}
        </ul>
        <button onClick={handleLogout} className='flex absolute bottom-[30px] left-5 text-pry gap-x-2.5 items-center'>
          <NavIcon icon='logout' />
          <h5 className='font-medium'>Logout</h5>
        </button>
      </div>
    </aside>
  );
}

export default SideNav;
