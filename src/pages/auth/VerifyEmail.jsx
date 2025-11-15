import React, { useEffect, useState } from 'react';
import { MailCheck, Link as LinkIcon, CheckCircle, XCircle, Loader } from 'lucide-react';
import api from '../../api/api';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { userStore } from '../../config/Store';

const VerifyEmail = () => {
   const navigate = useNavigate();
   const { setUserid, setAccessToken } = userStore();
   const [isVerified, setisVerified] = useState(null);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);

   const { token } = useParams();

   const getApiResponse = async () => {
      setLoading(true);
      setError(null);

      try {
         const response = await api.get(`/verify/${token}`);
         console.log("Verification Response:", response.data);
         setUserid(response.data.id);
         setAccessToken(response.data.accessToken);
         setisVerified(true);
         setTimeout(() => {
            navigate("/profile-setup")
         }, 5000)

      } catch (err) {
         console.error("Verification Error:", err);
         setisVerified(false);
         setError(err.response?.data?.message || "The verification link is invalid or has expired. Please try registering again.");

      } finally {
         setLoading(false);
      }
   };

   useEffect(() => {
      if (token) {
         getApiResponse();
      } else {
         setLoading(false);
         setisVerified(false);
         setError("Verification token is missing in the URL.");
      }
   }, [token]);

   const renderContent = () => {
      if (loading) {
         return (
            <>
               <Loader className="w-16 h-16 text-purple-500 mx-auto mb-6 animate-spin" />
               <h2 className="text-3xl font-bold mb-3 text-gray-800">
                  Verifying Email...
               </h2>
               <p className="text-md text-gray-600 mb-8">
                  Please wait while we confirm your email verification link.
               </p>
            </>
         );
      }

      if (isVerified === true) {
         return (
            <>
               <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6 animate-bounce" />

               <h2 className="text-3xl font-bold mb-3 text-gray-800">
                  Verification Complete!
               </h2>

               <p className="text-md text-gray-600 mb-8">
                  Your email address has been successfully verified. You can now log in to your account.
               </p>
            </>
         );
      }
      return (
         <>
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />

            <h2 className="text-3xl font-bold mb-3 text-gray-800">
               Verification Failed
            </h2>

            <p className="text-md text-gray-600 mb-6 font-medium">
               {error || "An unexpected error occurred during verification."}
            </p>

            <button
               onClick={() => navigate('/register')}
               className="w-full inline-block py-3 px-4 rounded-lg shadow-md text-lg font-bold text-white bg-red-500 hover:bg-red-600 transition duration-200 ease-in-out"
            >
               Return to Registration
            </button>
         </>
      );
   };

   return (
      <div className="w-full h-dvh bg-linear-to-br from-purple-500 to-indigo-700 flex flex-col">

         <header className='p-6 absolute top-0 left-0 z-10'>
            <div className='flex items-center space-x-2 text-white'>
               <MailCheck className="w-6 h-6" />
               <h1 className='text-xl font-bold tracking-wider'>
                  Talknet
               </h1>
            </div>
         </header>

         <div className="grow flex items-center justify-center">

            <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 mx-4 text-center">
               {renderContent()}
            </div>
         </div>
      </div>
   );
};

export default VerifyEmail;