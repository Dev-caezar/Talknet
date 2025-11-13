import React, { useState } from 'react';
import { Eye, EyeOff, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
   const navigate = useNavigate();

   const [showPassword, setShowPassword] = useState(false);
   const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
   };

   return (
      <div className="w-full h-[100vh] bg-gradient-to-br from-purple-500 to-indigo-700 flex flex-col">

         <header className='p-6 absolute top-0 left-0 z-10'>
            <div className='flex items-center space-x-2 text-white'>
               <User className="w-6 h-6" />
               <h1 className='text-xl font-bold tracking-wider'>
                  AppBrand
               </h1>
            </div>
         </header>

         <div className="flex-grow flex items-center justify-center">

            <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 sm:p-8 mx-4">

               <h2 className="text-2xl font-bold mb-8 text-gray-800 text-center">
                  Welcome Back
               </h2>

               <div className="w-full space-y-4">

                  <div>
                     <label className="block text-sm font-medium text-gray-700">Email Address</label>
                     <input
                        type="email"
                        name="email"
                        placeholder="you@example.com"
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 text-sm"
                     />
                  </div>

                  <div>
                     <label className="block text-sm font-medium text-gray-700">Password</label>
                     <div className="relative mt-1">
                        <input
                           type={showPassword ? "text" : "password"}
                           name="password"
                           placeholder="Enter your password"
                           className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 text-sm pr-10"
                        />
                        <span
                           className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 cursor-pointer"
                        >
                           {showPassword ? <Eye className="w-5 h-5" onClick={togglePasswordVisibility} /> : <EyeOff className="w-5 h-5" onClick={togglePasswordVisibility} />}
                        </span>
                     </div>
                     <div className="text-right mt-1">
                        <span className="text-xs text-purple-600 hover:text-purple-700 cursor-pointer" onClick={() => navigate("/forgot-password")}>
                           Forgot Password?
                        </span>
                     </div>
                  </div>

                  <button
                     type="submit"
                     className="w-full mt-6 flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-md text-base font-semibold text-white bg-purple-600 hover:bg-purple-700 transition duration-200 ease-in-out"
                  >
                     Log In
                  </button>

                  <div className="mt-4 pt-2 border-t border-gray-100 text-center text-sm text-gray-600">
                     Don't have an account yet?
                     <span className="text-purple-600 font-medium hover:text-purple-700 ml-1 cursor-pointer" onClick={() => navigate("/")}>
                        Sign Up
                     </span>
                  </div>

               </div>
            </div>
         </div>
      </div>
   );
};

export default Login;