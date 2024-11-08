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
      <main className='mt-16 lg:mt-[140px] w-full lg:w-[900px] xl:w-1197 mx-auto px-5 xl:px-0'>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
