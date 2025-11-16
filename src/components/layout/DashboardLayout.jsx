import React, { useState } from 'react';
import { Sidebar } from '../static';
import { Outlet } from 'react-router-dom';
// Assuming you have a small component for the mobile menu button (Hamburger icon)
// import { MobileHeader } from './MobileHeader'; 

function DashboardLayout() {
   // State to control the visibility of the sidebar on mobile
   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

   return (
      <div className='w-full h-screen min-h-max bg-gray-200'>
         {/* Mobile Header/Menu Button (Optional but recommended) */}
         {/* Replace this div with a proper MobileHeader component if you have one */}
         <div className='lg:hidden p-3 flex justify-between items-center bg-white shadow-md'>
            <h1 className='text-xl font-bold'>Dashboard</h1>
            <button
               onClick={() => setIsSidebarOpen(true)}
               className='p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md'
            >
               {/* Hamburger Icon (You'd typically use an icon library here) */}
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            </button>
         </div>

         <div className='flex h-full min-h-screen'>
            {/* 1. Sidebar - Responsive Implementation */}
            <div className={`
                    // Mobile: Fixed, full height, conditionally visible (drawer)
                    fixed top-0 left-0 z-40 h-full w-[130px] transform transition-transform duration-300 ease-in-out
                    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                    
                    // Desktop: Static, always visible
                    lg:relative lg:translate-x-0 lg:flex-shrink-0 lg:p-3
                    // The actual Sidebar component will render inside this container
                `}>
               {/* Close button for mobile sidebar */}
               <button
                  onClick={() => setIsSidebarOpen(false)}
                  className='absolute top-3 right-3 lg:hidden p-1 text-gray-700 focus:outline-none'
               >
                  &times; {/* Simple close symbol */}
               </button>
               <Sidebar />
            </div>

            {/* Mobile Overlay (to click outside and close the sidebar) */}
            {isSidebarOpen && (
               <div
                  className='fixed inset-0 z-30 bg-black opacity-50 lg:hidden'
                  onClick={() => setIsSidebarOpen(false)}
               />
            )}

            {/* 2. Main Content - Responsive Implementation */}
            <main className='w-full h-full min-h-max p-3 lg:ml-0 overflow-y-auto'>
               <Outlet />
            </main>
         </div>
      </div>
   );
}

export default DashboardLayout;