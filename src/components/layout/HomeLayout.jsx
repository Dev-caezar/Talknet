import React from 'react'
import { Footer, Header } from '../static'
import { Outlet } from 'react-router-dom'

export default function HomeLayout() {
   return (
      <div className='grow flex flex-col'>
         <Header />
         <Outlet />
         <Footer />
      </div>
   )
}
