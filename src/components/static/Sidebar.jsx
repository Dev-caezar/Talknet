import React from 'react';
import logo from "../../assets/public/white-logo.png";
import {
   FiMessageCircle,
   FiUser,
   FiCompass,
   FiSettings,
   FiLogOut
} from 'react-icons/fi';

const Sidebar = () => {

   const topNav = [
      { icon: <FiMessageCircle />, label: "Chat", path: "/chat" },
      { icon: <FiUser />, label: "Profile", path: "/profile" },
      { icon: <FiCompass />, label: "Explore", path: "/explore" },
      { icon: <FiSettings />, label: "Settings", path: "settings" },
   ];

   const bottomNav = [
      { icon: <FiLogOut />, label: "Logout", path: "/" }
   ];

   return (
      <div className='sticky top-0 left-0 w-[100px] h-full bg-linear-to-t from-purple-700 to-purple-400 flex flex-col items-center py-4 rounded-[10px]'>

         {/* Logo */}
         <div className='w-15 h-15 overflow-hidden flex justify-center mb-4 border-b-2 border-gray-200'>
            <img src={logo} alt="logo" className='w-full h-full object-cover' />
         </div>

         {/* TOP NAVS */}
         <div className='flex flex-col grow items-center w-full'>
            {topNav.map((item, index) => (
               <div
                  key={index}
                  className='relative flex items-center justify-center h-6 w-6 mx-auto mt-4 mb-4 transition-all duration-300 ease-linear cursor-pointer group'
               >
                  <span className='text-2xl text-white opacity-80 group-hover:opacity-100'>
                     {item.icon}
                  </span>
                  <span className='absolute left-full ml-4 whitespace-nowrap bg-gray-800 text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                     {item.label}
                  </span>
               </div>
            ))}
         </div>

         {/* BOTTOM NAV (LOGOUT) */}
         <div className='mb-6'>
            {bottomNav.map((item, index) => (
               <div
                  key={index}
                  className='relative flex items-center justify-center h-6 w-6 mx-auto transition-all duration-300 ease-linear cursor-pointer group'
               >
                  <span className='text-2xl text-white opacity-80 group-hover:opacity-100'>
                     {item.icon}
                  </span>
                  <span className='absolute left-full ml-4 whitespace-nowrap bg-gray-800 text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                     {item.label}
                  </span>
               </div>
            ))}
         </div>

      </div>
   );
}

export default Sidebar;
