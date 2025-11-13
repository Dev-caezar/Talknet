import React, { useState } from 'react';
import { Eye, EyeOff, Image, UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup"

const Register = () => {
   const navigate = useNavigate();
   const [errors, setErrors] = useState({})
   const [formData, setFormData] = useState({
      fullName: "",
      email: "",
      phoneNumber: "",
      password: "",
      profilePicture: ""
   })

   const handleChange = (e) => {
      const { name, value, files } = e.target
      setFormData({
         ...formData,
         [name]: files ? files[0] : value
      })
   }

   const validationSchema = Yup.object({
      fullName: Yup.string().required("Full name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      phoneNumber: Yup.string().required("Phone number is required"),
      password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
      profilePicture: Yup.mixed().required("Profile picture is required")

   })
   const handleSubmit = async (e) => {
      e.preventDefault()
      try {
         await validationSchema.validate(formData, { abortEarly: false })
         navigate("/verify-email")
      } catch (error) {
         if (error instanceof Yup.ValidationError) {
            const errors = {}
            error.inner.forEach(err => {
               errors[err.path] = err.message
            })
            setErrors(errors)
            console.log(errors)
         }
      }
   }

   const [showPassword, setShowPassword] = useState(false);
   const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
   };



   return (
      <div className="w-full h-[100dvh] bg-gradient-to-br from-purple-500 to-indigo-700 flex flex-col">

         <header className='p-6 absolute top-0 left-0 z-10'>
            <div className='flex items-center space-x-2 text-white'>
               <UserPlus className="w-6 h-6" />
               <h1 className='text-xl font-bold tracking-wider'>
                  AppBrand
               </h1>
            </div>
         </header>
         <div className="flex-grow flex items-center justify-center">

            <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-6 sm:p-8 mx-4">

               <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
                  Create Your Account
               </h2>

               <div className="flex flex-col items-center mb-5">
                  <label
                     htmlFor="profileImage"
                     className="cursor-pointer relative w-20 h-20 rounded-full overflow-hidden border-4 border-purple-500 flex items-center justify-center bg-gray-100 hover:border-indigo-500 transition duration-300"
                  >
                     {formData.profilePicture ? (
                        <img
                           src={URL.createObjectURL(formData.profilePicture)}
                           alt="Profile Preview"
                           className="w-full h-full object-cover"
                        />
                     ) : (
                        <span className="text-gray-400 text-sm">+</span>
                     )}

                     <input
                        id="profileImage"
                        type="file"
                        accept="image/*"
                        name="profilePicture"
                        onChange={handleChange}
                        className="hidden"
                     />
                  </label>

                  <p className="text-xs text-gray-500 mt-1">Upload profile picture</p>
               </div>

               <div className="w-full space-y-3">
                  <div>
                     <label className="block text-sm font-medium text-gray-700">Full Name</label>
                     <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Enter your Name"
                        className="mt-1 block w-full px-4 py-1.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 text-sm"
                     />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                     <div>
                        <label className="block text-sm font-medium text-gray-700">Email Address</label>
                        <input
                           type="email"
                           name="email"
                           value={formData.email}
                           onChange={handleChange}
                           placeholder="you@example.com"
                           className="mt-1 block w-full px-4 py-1.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 text-sm"
                        />
                     </div>

                     <div>
                        <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                        <input
                           type="tel"
                           name="phoneNumber"
                           value={formData.phoneNumber}
                           onChange={handleChange}
                           placeholder="Enter your phone"
                           className="mt-1 block w-full px-4 py-1.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 text-sm"
                        />
                     </div>
                  </div>
                  <div>
                     <label className="block text-sm font-medium text-gray-700">Password</label>
                     <div className="relative mt-1">
                        <input
                           type={showPassword ? "text" : "password"}
                           name="password"
                           value={formData.password}
                           onChange={handleChange}
                           placeholder="Enter a strong password"
                           className="block w-full px-4 py-1.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 text-sm pr-10"
                        />
                        <span
                           className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 cursor-pointer"
                        >
                           {showPassword ? <Eye className="w-5 h-5" onClick={togglePasswordVisibility} /> : <EyeOff className="w-5 h-5" onClick={togglePasswordVisibility} />}
                        </span>
                     </div>
                  </div>
                  <button
                     onClick={handleSubmit}
                     className="w-full mt-4 flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-md text-base font-semibold text-white bg-purple-600 hover:bg-purple-700 transition duration-200 ease-in-out"
                  >
                     Register
                  </button>

                  <div className="mt-3 text-center text-sm text-gray-600">
                     Already have an account?
                     <span className="text-purple-600 font-medium hover:text-purple-700 ml-1 cursor-pointer" onClick={() => navigate("/login")}>
                        Sign In
                     </span>
                  </div>

               </div>
            </div>
         </div>
      </div>
   );
};

export default Register;