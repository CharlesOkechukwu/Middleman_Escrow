import React from 'react'
import { Outlet } from 'react-router-dom'
import HeaderBox from '../nav/HeaderBox'

export const DefaultLayout: React.FC = () => {
  return (
    <>
      <header className='w-full'>
        <HeaderBox />
      </header>
      <main className='mt-[140px] w-full lg:w-[900px] xl:w-1197 mx-auto px-5 xl:px-0'>
        <Outlet />
      </main>
    </>
  )
}
