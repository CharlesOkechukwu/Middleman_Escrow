import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '@/assets/images/logo.svg';
import twitter from '@/assets/images/socials/twitter.png';
import fb from '@/assets/images/socials/fb.png';
import ig from '@/assets/images/socials/ig.png';
import github from '@/assets/images/socials/github.png';
import { companyLinks, helpLinks, resourcesLinks } from '@/constant/links';

interface Props {

}

const Footer: React.FC<Props> = (props) => {
  return (
    <footer className='w-full px-5 xl:px-0 mt-24 lg:w-[900px] xl:w-[1302px] h-full mx-auto'>
      <div className='w-full h-full grid grid-cols-2 gap-12 xl:h-[211px] xl:flex justify-between'>
        <div className='flex flex-col justify-between'>
          <NavLink to='/'>
            <img src={logo} alt="company's logo" />
          </NavLink>
          <p className='text-14 text-[#52525B] mt-3 lg:mt-0'>
            Clarity gives you the blocks and <br className='hidden xl:block' /> components you need to create a <br className='hidden xl:block' /> truly professional website.
          </p>

          <ul className='w-full flex gap-x-3 pb-1 pt-5 lg:pt-0'>
            <li>
              <a href="#">
                <img src={twitter} alt="X fka twitter icon" />
              </a>
            </li>
            <li>
              <a href="#">
                <img src={fb} alt="fb icon" />
              </a>
            </li>
            <li>
              <a href="#">
                <img src={ig} alt="ig icon" />
              </a>
            </li>
            <li>
              <a href="#">
                <img src={github} alt="github icon" />
              </a>
            </li>
          </ul>
        </div>

        <div className='h-full'>
          <h6 className='text-pry uppercase text-[13px] font-semibold'>
            Company
          </h6>
          <ul className='pt-[30px] h-full'>
            {companyLinks.map(item => (
              <li key={item.id} className='py-2'>
                <NavLink to={item.path} className='text-[#191D23] text-14'>
                  {item.routeName}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h6 className='text-pry text-[13px] uppercase font-semibold'>
            Help
          </h6>
          <ul className='pt-[30px]'>
            {helpLinks.map(item => (
              <li key={item.id} className='py-2'>
                <NavLink to={item.path} className='text-[#191D23] text-14'>
                  {item.routeName}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h6 className='text-pry text-[13px] font-semibold'>
            RESOURCES
          </h6>
          <ul className='pt-[30px]'>
            {resourcesLinks.map(item => (
              <li key={item.id} className='py-2'>
                <NavLink to={item.path} className='text-[#191D23] text-14'>
                  {item.routeName}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className='mt-[93px] w-full h-[65px] mb-14 flex items-center border-t border-[#E2E8F0] justify-center'>
        <p className='text-[#52525B] text-center'>© Copyright middleman 2024, All Rights Reserved</p>
      </div>
    </footer>
  );
}

export default Footer;
