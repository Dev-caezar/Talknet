import React from 'react'
import Hero from '../components/Hero'
import Features from '../components/Features'

const Home = () => {
   return (
      <div className='w-full h-screen min-h-max flex flex-col gap-[50px]'>
         <Hero />
         <Features />
      </div>
   )
}

export default Home