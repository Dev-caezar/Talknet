import React from 'react'
import { Footer, Header } from '../static'
import { Outlet } from 'react-router-dom'

export default function HomeLayout() {
   return (
      <div className='w-full h-screen min-h-max flex flex-col gap-[20px]'>
         <Header />
         <Outlet />
         <Footer />
      </div>
   )
}
