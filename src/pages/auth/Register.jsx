import React, { useState } from 'react';
import { Eye, EyeOff, UserPlus, MailCheck, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup"
import api from '../../api/api';

const ErrorDisplay = ({ message }) => {
   return message ? (
      <p className="mt-1 text-xs text-red-500 font-medium">{message}</p>
   ) : null;
};

const SuccessModal = ({ isOpen, onClose, email }) => {
   if (!isOpen) return null;

   return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/75 backdrop-blur-sm transition-opacity duration-300">

         <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm m-4 p-6 sm:p-8 transform transition-all duration-300 scale-100 ease-out">

            <button
               onClick={onClose}
               className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors rounded-full p-1"
               aria-label="Close modal"
            >
               <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col items-center text-center">
               <MailCheck className="w-12 h-12 text-green-500 mb-4" />

               <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  Registration Successful!
               </h3>

               <p className="text-gray-600 mb-6 text-sm">
                  You're almost ready to go!
               </p>

               <div className="p-4 bg-green-50 rounded-lg border border-green-200 w-full mb-6">
                  <p className="font-semibold text-green-700">
                     Please check your inbox at:
                  </p>
                  <p className="text-green-800 font-mono text-sm break-all mt-1">
                     {email}
                  </p>
                  <p className="text-xs text-green-600 mt-2">
                     A verification link has been sent to your email address.
                  </p>
               </div>

               <button
                  onClick={onClose}
                  className="w-full py-2.5 px-4 rounded-xl text-white font-semibold bg-purple-600 hover:bg-purple-700 transition duration-200 shadow-md hover:shadow-lg"
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
         const response = await api.post('/register', formData);
         console.log("Registration API Response:", response);
         setShowSuccessModal(true);

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
         }
      }
   };

   const [showPassword, setShowPassword] = useState(false);
   const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
   };

   return (
      <div className="w-full h-dvh bg-linear-to-br from-purple-500 to-indigo-700 flex flex-col font-sans">
         <header className='p-6 absolute top-0 left-0 z-10'>
            <div className='flex items-center space-x-2 text-white'>
               <UserPlus className="w-6 h-6" />
               <h1 className='text-xl font-bold tracking-wider'>
                  AppBrand
               </h1>
            </div>
         </header>
         <div className="grow flex items-center justify-center">
            <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-6 sm:p-8 mx-4 transform transition duration-500 hover:shadow-3xl">
               <h2 className="text-3xl font-extrabold mb-6 text-gray-800 text-center">
                  Create Your Account
               </h2>
               <form onSubmit={handleSubmit} className="w-full space-y-4">

                  <div>
                     <label htmlFor="fullname" className="block text-sm font-semibold text-gray-700">Full Name</label>
                     <input
                        id="fullname"
                        type="text"
                        name="fullname"
                        value={formData.fullname}
                        onChange={handleChange}
                        placeholder="Enter your Name"
                        className={`mt-1 block w-full px-4 py-2 border ${errors.fullname ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 text-base transition`}
                     />
                     <ErrorDisplay message={errors.fullname} />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700">Email Address</label>
                        <input
                           id="email"
                           type="email"
                           name="email"
                           value={formData.email}
                           onChange={handleChange}
                           placeholder="you@example.com"
                           className={`mt-1 block w-full px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 text-base transition`}
                        />
                        <ErrorDisplay message={errors.email} />
                     </div>

                     <div>
                        <label htmlFor="phoneNumber" className="block text-sm font-semibold text-gray-700">Phone Number</label>
                        <input
                           id="phoneNumber"
                           type="tel"
                           name="phoneNumber"
                           value={formData.phoneNumber}
                           onChange={handleChange}
                           placeholder="e.g., 5551234567"
                           className={`mt-1 block w-full px-4 py-2 border ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 text-base transition`}
                        />
                        <ErrorDisplay message={errors.phoneNumber} />
                     </div>
                  </div>

                  <div>
                     <label htmlFor="password" className="block text-sm font-semibold text-gray-700">Password</label>
                     <div className="relative mt-1">
                        <input
                           id="password"
                           type={showPassword ? "text" : "password"}
                           name="password"
                           value={formData.password}
                           onChange={handleChange}
                           placeholder="Enter a strong password (min 8 characters)"
                           className={`block w-full px-4 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 text-base pr-10 transition`}
                        />
                        <span
                           className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 cursor-pointer hover:text-purple-600 transition"
                           onClick={togglePasswordVisibility}
                        >
                           {showPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                        </span>
                     </div>
                     <ErrorDisplay message={errors.password} />
                  </div>

                  <div>
                     <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700">Confirm Password</label>
                     <div className="relative mt-1">
                        <input
                           id="confirmPassword"
                           type={showPassword ? "text" : "password"}
                           name="confirmPassword"
                           value={formData.confirmPassword}
                           onChange={handleChange}
                           placeholder="Re-enter your password"
                           className={`block w-full px-4 py-2 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 text-base pr-10 transition`}
                        />
                        <span
                           className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 cursor-pointer hover:text-purple-600 transition"
                           onClick={togglePasswordVisibility}
                        >
                           {showPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                        </span>
                     </div>
                     <ErrorDisplay message={errors.confirmPassword} />
                  </div>

                  <button
                     type="submit"
                     className="w-full mt-6 flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-lg text-lg font-bold text-white bg-purple-600 hover:bg-purple-700 transition duration-300 ease-in-out transform hover:scale-[1.01]"
                  >
                     Register
                  </button>

                  <div className="mt-4 text-center text-sm text-gray-600">
                     Already have an account?
                     <span className="text-purple-600 font-medium hover:text-purple-700 ml-1 cursor-pointer hover:underline" onClick={() => navigate("/login")}>
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