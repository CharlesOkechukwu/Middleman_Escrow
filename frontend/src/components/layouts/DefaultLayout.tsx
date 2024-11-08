import React from 'react'
import { Outlet } from 'react-router-dom'
import HeaderBox from '../nav/HeaderBox'

export const DefaultLayout: React.FC = () => {
  return (
    <>
      <header className='w-full'>
        <HeaderBox />
      </header>
      <main>
        <Outlet />
      </main>
    </>
  )
}
