import React from 'react'
import { Outlet } from 'react-router-dom'
import HeaderBox from '../nav/HeaderBox'
import Footer from '../footer/Footer'

export const DefaultLayout: React.FC = () => {
  return (
    <>
      <header className='w-full'>
        <HeaderBox />
      </header>
      <main className='mt-16 lg:mt-[140px] w-full'>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
