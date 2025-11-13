import React from 'react';
import { Mail, Link, LockOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Forgotpassword = () => {
   const navigate = useNavigate()
   return (
      <div className="w-full h-[100dvh] bg-gradient-to-br from-purple-500 to-indigo-700 flex flex-col">

         <header className='p-6 absolute top-0 left-0 z-10'>
            <div className='flex items-center space-x-2 text-white'>
               <LockOpen className="w-6 h-6" />
               <h1 className='text-xl font-bold tracking-wider'>
                  AppBrand
               </h1>
            </div>
         </header>

         <div className="flex-grow flex items-center justify-center">

            <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 sm:p-8 mx-4">

               <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">
                  Password Recovery
               </h2>

               <p className="text-sm text-gray-600 text-center mb-6">
                  Enter the email address associated with your account to receive a reset link.
               </p>

               <div className="w-full space-y-4">

                  <div>
                     <label className="block text-sm font-medium text-gray-700">Email Address</label>
                     <div className="relative mt-1">
                        <input
                           type="email"
                           name="email"
                           placeholder="you@example.com"
                           className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 text-sm pl-10"
                        />
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                     </div>
                  </div>

                  <button
                     type="submit"
                     onClick={() => navigate("/reset-password")}
                     className="w-full mt-6 flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-md text-base font-semibold text-white bg-purple-600 hover:bg-purple-700 transition duration-200 ease-in-out"
                  >
                     Send Reset Link
                  </button>

                  <div className="mt-4 pt-2 border-t border-gray-100 text-center text-sm text-gray-600">
                     Remembered your password?
                     <span className="text-purple-600 font-medium hover:text-purple-700 ml-1">
                        Back to Login
                     </span>
                  </div>

               </div>
            </div>
         </div>
      </div>
   );
};

export default Forgotpassword;