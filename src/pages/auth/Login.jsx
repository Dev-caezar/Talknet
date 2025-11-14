import React, { useState } from 'react';
import { Eye, EyeOff, User } from 'lucide-react';
// Assuming 'react-router-dom' is available
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup"; // Import Yup

// Custom component to display errors concisely
const ErrorDisplay = ({ message }) => {
   return message ? (
      <p className="mt-1 text-xs text-red-500 font-medium">{message}</p>
   ) : null;
};

// Define the Yup validation schema for login
const validationSchema = Yup.object({
   identifier: Yup.string()
      .required("Login ID (Username, Email, or Phone) is required")
      // Custom test to ensure the identifier looks like a valid email, phone, or username
      .test(
         'is-valid-identifier',
         'Must be a valid username, email, or phone number',
         (value) => {
            if (!value) return false;
            const trimmedValue = value.trim();

            // 1. Email check (basic regex)
            const isEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(trimmedValue);

            // 2. Phone Number check (7 to 15 digits)
            const isPhoneNumber = /^\d{7,15}$/.test(trimmedValue);

            // 3. Username check (3-20 characters, letters/numbers/underscores)
            const isUsername = /^[a-zA-Z0-9_]{3,20}$/.test(trimmedValue);

            // A valid identifier must match at least one type
            return isEmail || isPhoneNumber || isUsername;
         }
      ),
   password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
});

const Login = () => {
   const navigate = useNavigate();

   const [formData, setFormData] = useState({
      identifier: "",
      password: "",
   });
   const [errors, setErrors] = useState({});

   const [showPassword, setShowPassword] = useState(false);

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

   const handleSubmit = async (e) => {
      e.preventDefault();
      setErrors({});

      try {
         await validationSchema.validate(formData, { abortEarly: false });

         console.log("Form Data Validated. Attempting backend login with:", formData);

         const identifier = formData.identifier.trim();
         const isEmail = identifier.includes('@');
         const isPhoneNumber = /^\d{7,15}$/.test(identifier);

         if (isEmail) {
            console.log("Backend would try to log in via Email...");
         } else if (isPhoneNumber) {
            console.log("Backend would try to log in via Phone Number...");
         } else {
            console.log("Backend would try to log in via Username...");
         }

         // navigate("/dashboard"); 

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
         }
      }
   };


   const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
   };

   return (
      <div className="w-full h-screen bg-linear-to-br from-purple-500 to-indigo-700 flex flex-col font-sans">
         <header className='p-6 absolute top-0 left-0 z-10'>
            <div className='flex items-center space-x-2 text-white'>
               <User className="w-6 h-6" />
               <h1 className='text-xl font-bold tracking-wider'>
                  AppBrand
               </h1>
            </div>
         </header>

         <div className="flex-1 flex items-center justify-center">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 mx-4 transition duration-500 hover:shadow-3xl">

               <h2 className="text-3xl font-extrabold mb-8 text-gray-800 text-center">
                  Welcome Back
               </h2>

               <form onSubmit={handleSubmit} className="w-full space-y-5">

                  <div>
                     <label htmlFor="identifier" className="block text-sm font-semibold text-gray-700">Username, Email, or Phone Number</label>
                     <input
                        id="identifier"
                        type="text"
                        name="identifier"
                        value={formData.identifier}
                        onChange={handleChange}
                        placeholder="Enter your username, email, or phone number"
                        className={`mt-1 block w-full px-4 py-2.5 border ${errors.identifier ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 text-base transition`}
                     />
                     <ErrorDisplay message={errors.identifier} />
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
                           placeholder="Enter your password"
                           className={`block w-full px-4 py-2.5 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 text-base pr-10 transition`}
                        />
                        <span
                           className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 cursor-pointer hover:text-purple-600 transition"
                           onClick={togglePasswordVisibility}
                        >
                           {showPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                        </span>
                     </div>
                     <ErrorDisplay message={errors.password} />
                     <div className="text-right mt-1">
                        <span className="text-xs text-purple-600 hover:text-purple-700 cursor-pointer font-medium" onClick={() => navigate("/forgot-password")}>
                           Forgot Password?
                        </span>
                     </div>
                  </div>

                  <button
                     type="submit"
                     className="w-full mt-6 flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-lg text-lg font-bold text-white bg-purple-600 hover:bg-purple-700 transition duration-300 ease-in-out transform hover:scale-[1.01]"
                  >
                     Log In
                  </button>

               </form>

               <div className="mt-6 pt-4 border-t border-gray-100 text-center text-sm text-gray-600">
                  Don't have an account yet?
                  <span className="text-purple-600 font-medium hover:text-purple-700 ml-1 cursor-pointer hover:underline" onClick={() => navigate("/")}>
                     Sign Up
                  </span>
               </div>

            </div>
         </div>
      </div>
   );
};

export default Login;