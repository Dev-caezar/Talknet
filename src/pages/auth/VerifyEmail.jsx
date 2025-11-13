import React, { useState } from 'react';
import { MailCheck, Link, CheckCircle } from 'lucide-react';

const VerifyEmail = () => {
   const [isVerified, setisVerified] = useState(false);

   return (
      <div className="w-full h-[100dvh] bg-gradient-to-br from-purple-500 to-indigo-700 flex flex-col">

         <header className='p-6 absolute top-0 left-0 z-10'>
            <div className='flex items-center space-x-2 text-white'>
               <MailCheck className="w-6 h-6" />
               <h1 className='text-xl font-bold tracking-wider'>
                  AppBrand
               </h1>
            </div>
         </header>

         <div className="flex-grow flex items-center justify-center">

            <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 mx-4 text-center">

               {isVerified ? (
                  <>
                     <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6 animate-bounce" />

                     <h2 className="text-3xl font-bold mb-3 text-gray-800">
                        Verification Complete!
                     </h2>

                     <p className="text-md text-gray-600 mb-8">
                        Your email address has been successfully verified. You can now log in to your account.
                     </p>

                     <Link
                        to="/login"
                        className="w-full inline-block py-2.5 px-4 border border-transparent rounded-lg shadow-md text-base font-semibold text-white bg-purple-600 hover:bg-purple-700 transition duration-200 ease-in-out"
                     >
                        Proceed to Login
                     </Link>
                  </>
               ) : (
                  <>

                     <MailCheck className="w-16 h-16 text-purple-500 mx-auto mb-6 animate-spin" />
                     <h2 className="text-3xl font-bold mb-3 text-gray-800">
                        Verifying Email...
                     </h2>
                     <p className="text-md text-gray-600 mb-8">
                        Please wait while we confirm your email verification link.
                     </p>
                  </>
               )}
            </div>
         </div>
      </div>
   );
};

export default VerifyEmail;