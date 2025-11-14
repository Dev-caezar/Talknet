import React from 'react'
import Hero from '../components/Hero'
import Features from '../components/Features'
import ChatFeatureSection from '../components/ChatFeatureSection'

const Home = () => {
   return (
      <div className='w-full h-screen min-h-max flex flex-col'>
         <Hero />
         <Features />
         <ChatFeatureSection />
      </div>
   )
}

export default Home