import React from 'react';
import { Outlet } from 'react-router-dom';
import SideNav from '../navigation/SideNav';
import TopNav from '../navigation/TopNav';

const DashboardLayout: React.FC = () => {
  return (
    <>
      <main className='bg-[#F4F4F4] w-full h-full px-[33px] flex py-[30px] gap-8'>
        <SideNav />
        <section className='flex-1 bg-white rounded-[20px] h-full'>
          <TopNav />
          <Outlet />
        </section>
      </main>
    </>
  );
}

export default DashboardLayout;
// flask --app app run 
