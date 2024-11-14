import React from 'react';
import { Outlet } from 'react-router-dom';
import SideNav from '../dashboard/SideNav';
import TopNav from '../dashboard/TopNav';

const DashboardLayout: React.FC = () => {
  return (
    <>
      <TopNav />
      <main className='bg-[#F4F4F4] w-full h-full px-[33px] flex pb-[30px] gap-8'>
        <SideNav />
        <section className='flex-1 bg-white rounded-[20px] h-full'>
          <Outlet />
        </section>
      </main>
    </>
  );
}

export default DashboardLayout;
