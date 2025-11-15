import React, { useState } from 'react';
import { Eye, EyeOff, UserPlus, MailCheck, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import api from '../../api/api';

/**
 * Reusable component to display validation errors.
 */
const ErrorDisplay = ({ message }) => {
   return message ? (
      <p className="mt-1 text-xs text-red-600 font-semibold italic">{message}</p>
   ) : null;
};

/**
 * Custom Tailwind-styled Modal for successful registration.
 */
const SuccessModal = ({ isOpen, onClose, email }) => {
   if (!isOpen) return null;

   return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/80 backdrop-blur-sm transition-opacity duration-500 ease-in-out">

         <div className="bg-white rounded-2xl shadow-3xl w-full max-w-md m-4 p-8 transform transition-all duration-300 scale-100 ease-out border-t-4 border-green-500">

            <button
               onClick={onClose}
               className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-gray-300"
               aria-label="Close modal"
            >
               <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col items-center text-center">
               <MailCheck className="w-14 h-14 text-green-500 mb-6" />

               <h3 className="text-3xl font-extrabold text-gray-800 mb-3">
                  Success!
               </h3>

               <p className="text-gray-600 mb-6 text-base">
                  You're almost ready to go!
               </p>

               <div className="p-5 bg-green-50 rounded-xl border border-green-300 w-full mb-8">
                  <p className="font-bold text-green-800 text-base">
                     Please check your inbox at:
                  </p>
                  <p className="text-green-700 font-mono text-sm break-all mt-2 bg-green-100 p-2 rounded-lg">
                     {email}
                  </p>
                  <p className="text-xs text-green-600 mt-3">
                     A **verification link** has been sent. Click it to activate your account.
                  </p>
               </div>

               <button
                  onClick={onClose}
                  className="w-full py-3 px-4 rounded-xl text-white font-bold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 transition duration-200 shadow-xl hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-purple-300 focus:ring-opacity-50"
               >
                  I understand, continue to login
               </button>
            </div>
         </div>
      </div>
   );
};


const Register = () => {
   const navigate = useNavigate();
   const [errors, setErrors] = useState({});
   const [formData, setFormData] = useState({
      fullname: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: ""
   });

   const [showSuccessModal, setShowSuccessModal] = useState(false);
   const [showPassword, setShowPassword] = useState(false);
   // 💥 New state for loading/API status
   const [loading, setLoading] = useState(false);

   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({
         ...prev,
         [name]: value
      }));

      if (errors[name]) {
         setErrors(prev => ({ ...prev, [name]: '' }));
      }
   };

   const validationSchema = Yup.object({
      fullname: Yup.string().required("Full name is required"),
      email: Yup.string().email("Invalid email address").required("Email is required"),
      phoneNumber: Yup.string()
         .matches(/^[0-9]+$/, "Phone number must be digits only")
         .min(10, "Phone number must be at least 10 digits")
         .required("Phone number is required"),
      password: Yup.string()
         .min(8, "Password must be at least 8 characters")
         .required("Password is required"),
      confirmPassword: Yup.string()
         .oneOf([Yup.ref('password'), null], 'Passwords must match')
         .required('Confirm Password is required'),
   });

   const handleModalClose = () => {
      setShowSuccessModal(false);
      navigate("/login");
   };


   const handleSubmit = async (e) => {
      e.preventDefault();
      setErrors({});

      try {
         await validationSchema.validate(formData, { abortEarly: false });
         setLoading(true);
         const response = await api.post('/register', formData);
         console.log(response);
         setShowSuccessModal(true);
         localStorage.setItem('email', formData.email);
      } catch (error) {
         if (error instanceof Yup.ValidationError) {
            const newErrors = {};
            error.inner.forEach(err => {
               if (err.path) {
                  newErrors[err.path] = err.message;
               }
            });
            setErrors(newErrors);
            console.error("Validation Errors:", newErrors);
         } else {
            console.error("Registration Error:", error);
            setErrors({ general: error.response?.data?.message || "Registration failed. Please try again." });
         }
      } finally {
         setLoading(false);
      }
   };

   const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
   };

   return (
      <div className="w-full h-dvh flex font-sans antialiased">
         {/* Left Section (unchanged) */}
         <div className="hidden md:flex w-1/2 bg-gradient-to-br from-purple-700 to-indigo-600 relative overflow-hidden items-center justify-center p-8">
            <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-white/10 rounded-full mix-blend-overlay animate-float-slow opacity-80"></div>
            <div className="absolute bottom-1/3 right-1/3 w-28 h-28 bg-white/15 rounded-full mix-blend-overlay animate-float-fast opacity-90"></div>
            <div className="absolute top-1/2 -left-20 w-80 h-80 bg-white/5 rounded-full mix-blend-overlay animate-float-medium"></div>
            <div className="absolute -bottom-10 right-1/4 w-96 h-96 bg-white/5 rounded-full mix-blend-overlay animate-float-slow"></div>

            <div className="relative z-10 text-white text-center">
               <div className='flex items-center justify-center space-x-3 mb-10'>
                  <div className="w-14 h-14 border-4 border-white rounded-full flex items-center justify-center shadow-lg">
                     <UserPlus className="w-7 h-7" />
                  </div>
                  <h1 className='text-4xl font-black tracking-widest'>
                     Talknet
                  </h1>
               </div>
               <h2 className="text-4xl font-extrabold mb-4 leading-snug">
                  Join Our Community Today
               </h2>
               <p className="text-xl opacity-90 font-light">
                  Register to create your account and start your journey.
               </p>
               <p className="absolute bottom-[-150px] left-0 w-full text-sm opacity-50 font-light tracking-wide">
                  &copy; 2025 Talknet. All rights reserved.
               </p>
            </div>
         </div>

         <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-6 sm:p-10 overflow-y-auto">
            <div className="w-full max-w-md">
               <h2 className="text-4xl font-extrabold mb-10 text-gray-900 text-center md:text-left tracking-tight">
                  Create Account 🚀
               </h2>
               <form onSubmit={handleSubmit} className="w-full space-y-6">

                  {/* Input fields disabled when loading */}
                  <div>
                     <label htmlFor="fullname" className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
                     <input
                        id="fullname"
                        type="text"
                        name="fullname"
                        value={formData.fullname}
                        onChange={handleChange}
                        placeholder="Enter your Name"
                        disabled={loading} // 🔒 Disabled state applied
                        className={`block w-full px-4 py-3.5 border ${errors.fullname ? 'border-red-500' : 'border-gray-300'} rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-purple-600 text-base placeholder-gray-400 transition duration-150 ease-in-out ${loading ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                     />
                     <ErrorDisplay message={errors.fullname} />
                  </div>

                  <div>
                     <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
                     <input
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        disabled={loading} // 🔒 Disabled state applied
                        className={`block w-full px-4 py-3.5 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-purple-600 text-base placeholder-gray-400 transition duration-150 ease-in-out ${loading ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                     />
                     <ErrorDisplay message={errors.email} />
                  </div>

                  <div>
                     <label htmlFor="phoneNumber" className="block text-sm font-semibold text-gray-700 mb-1">Phone Number</label>
                     <input
                        id="phoneNumber"
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        placeholder="e.g., 5551234567"
                        disabled={loading} // 🔒 Disabled state applied
                        className={`block w-full px-4 py-3.5 border ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'} rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-purple-600 text-base placeholder-gray-400 transition duration-150 ease-in-out ${loading ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                     />
                     <ErrorDisplay message={errors.phoneNumber} />
                  </div>

                  <div>
                     <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
                     <div className="relative">
                        <input
                           id="password"
                           type={showPassword ? "text" : "password"}
                           name="password"
                           value={formData.password}
                           onChange={handleChange}
                           placeholder="Enter a strong password (min 8 characters)"
                           disabled={loading} // 🔒 Disabled state applied
                           className={`block w-full px-4 py-3.5 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-purple-600 text-base pr-12 placeholder-gray-400 transition duration-150 ease-in-out ${loading ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                        />
                        <span
                           className={`absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 cursor-pointer transition ${loading ? 'opacity-50 pointer-events-none' : 'hover:text-purple-600'}`}
                           onClick={!loading ? togglePasswordVisibility : undefined}
                        >
                           {showPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                        </span>
                     </div>
                     <ErrorDisplay message={errors.password} />
                  </div>

                  <div>
                     <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-1">Confirm Password</label>
                     <div className="relative">
                        <input
                           id="confirmPassword"
                           type={showPassword ? "text" : "password"}
                           name="confirmPassword"
                           value={formData.confirmPassword}
                           onChange={handleChange}
                           placeholder="Re-enter your password"
                           disabled={loading} // 🔒 Disabled state applied
                           className={`block w-full px-4 py-3.5 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-purple-600 text-base pr-12 placeholder-gray-400 transition duration-150 ease-in-out ${loading ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                        />
                        <span
                           className={`absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 cursor-pointer transition ${loading ? 'opacity-50 pointer-events-none' : 'hover:text-purple-600'}`}
                           onClick={!loading ? togglePasswordVisibility : undefined}
                        >
                           {showPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                        </span>
                     </div>
                     <ErrorDisplay message={errors.confirmPassword} />
                  </div>

                  {/* General Server Error Display */}
                  {errors.general && (
                     <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg text-sm font-medium">
                        {errors.general}
                     </div>
                  )}

                  {/* Submit Button with Loading State */}
                  <button
                     type="submit"
                     disabled={loading} // 🔒 Disabled state applied
                     className={`w-full mt-8 flex justify-center items-center py-4 px-4 rounded-xl shadow-xl text-xl font-extrabold text-white transition duration-200 ease-in-out focus:outline-none focus:ring-4 focus:ring-purple-300 focus:ring-opacity-50 
                            ${loading
                           ? 'bg-gray-400 cursor-not-allowed'
                           : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 transform hover:scale-[1.01]'
                        }`}
                  >
                     {loading ? (
                        <>
                           {/* Spinner SVG - requires custom animation in tailwind.config.js */}
                           <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                           </svg>
                           PROCESSING...
                        </>
                     ) : (
                        <>
                           CREATE YOUR ACCOUNT
                           <svg className="ml-3 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                        </>
                     )}
                  </button>

                  <div className="mt-8 text-center text-base text-gray-500">
                     Already have an account?
                     <span className="text-purple-600 font-bold hover:text-purple-700 ml-1 cursor-pointer hover:underline underline-offset-2" onClick={() => navigate("/login")}>
                        Sign In
                     </span>
                  </div>

               </form>
            </div>
         </div>

         <SuccessModal
            isOpen={showSuccessModal}
            onClose={handleModalClose}
            email={formData.email}
         />
      </div>
   );
};

export default Register;