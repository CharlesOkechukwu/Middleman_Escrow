import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet';
import logo from '@/assets/images/logo.svg';
import { links } from '@/constant/links';
import { Button } from '../ui/button';



const MobileNav: React.FC = () => {

  const { pathname } = useLocation();

  return (
    <aside>
      <Sheet>
        <SheetTrigger>
          <Menu />
        </SheetTrigger>
        <SheetContent className='bg-white'>
          <SheetHeader>
            <SheetTitle>
              <img src={logo} alt="company's logo" />
            </SheetTitle>
            <SheetDescription className='pl-2 pt-4'>
              {
                links.map(link => (
                  <NavLink to={link.path} key={link.id} className={`block py-3 ${link.path === pathname ? 'text-pry font-semibold' : 'text-pry-black font-normal'}`}>
                    <SheetClose className='capitalize'>
                      {link.routeName}
                    </SheetClose>
                  </NavLink>
                ))
              }

              <div className='flex flex-col gap-y-6 py-3'>
                <Button className='rounded-[7px] w-[161px]'>
                  Buy Now
                </Button>
                <Button variant='outline' className='rounded-[7px] w-[161px] text-pry'>
                  <NavLink to='#'>
                    Sign Up
                  </NavLink>
                </Button>
              </div>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </aside>
  );
}

export default MobileNav;
