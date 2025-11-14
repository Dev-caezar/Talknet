import React, { useState } from 'react';
import { Camera, User, UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup";

const ProfileSetup = () => {
   const navigate = useNavigate();

   const [formData, setFormData] = useState({
      username: '',
      profilePicture: null,
   });
   const [errors, setErrors] = useState({});
   const [previewUrl, setPreviewUrl] = useState(null);

   const handleChange = (e) => {
      const { name, value, files } = e.target;

      if (name === "profilePicture" && files && files[0]) {
         const file = files[0];
         setFormData(prev => ({ ...prev, [name]: file }));
         setPreviewUrl(URL.createObjectURL(file));
         setErrors(prev => ({ ...prev, [name]: undefined })); // Clear error on file change
      } else {
         setFormData(prev => ({ ...prev, [name]: value }));
         setErrors(prev => ({ ...prev, [name]: undefined })); // Clear error on value change
      }
   };

   // Validation Schema for Username
   const validationSchema = Yup.object({
      username: Yup.string()
         .required("Username is required")
         .min(3, "Username must be at least 3 characters")
         .max(20, "Username must be less than 20 characters")
         .matches(
            /^[a-zA-Z0-9_]+$/,
            "Username can only contain letters, numbers, and underscores"
         ),
      // Note: Profile picture validation (size/type) is usually complex and handled by backend/frontend logic,
      // but for basic validation here, we will omit it, as the requirement was primarily for username.
   });

   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         // Validate only the fields present in the schema (username)
         await validationSchema.validate({ username: formData.username }, { abortEarly: false });

         setErrors({});

         // 1. Data is ready for backend submission
         console.log("Profile Data Ready for Submission:");
         console.log("Username:", formData.username);
         console.log("Profile Picture File:", formData.profilePicture);

         // Placeholder for navigation after successful save
         // navigate("/home"); 

      } catch (error) {
         if (error instanceof Yup.ValidationError) {
            const newErrors = {};
            error.inner.forEach(err => {
               newErrors[err.path] = err.message;
            });
            setErrors(newErrors);
            console.log("Validation Errors:", newErrors);
         }
      }
   };

   return (
      <div className="w-full h-[100dvh] bg-gradient-to-br from-purple-500 to-indigo-700 flex flex-col font-sans">

         <header className='p-6 absolute top-0 left-0 z-10'>
            <div className='flex items-center space-x-2 text-white'>
               <UserPlus className="w-6 h-6" />
               <h1 className='text-xl font-bold tracking-wider'>
                  AppBrand
               </h1>
            </div>
         </header>

         <div className="flex-grow flex items-center justify-center">

            <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 sm:p-8 mx-4">

               <h2 className="text-2xl font-bold mb-8 text-gray-800 text-center">
                  Setup Your Profile
               </h2>

               <form onSubmit={handleSubmit} className="w-full space-y-6">

                  {/* Profile Picture Upload Area */}
                  <div className="flex flex-col items-center mb-5">
                     <label
                        htmlFor="profilePictureInput"
                        className="relative w-28 h-28 rounded-full border-4 border-purple-500 flex items-center justify-center bg-gray-100 cursor-pointer shadow-md overflow-hidden transition duration-300 hover:border-indigo-600"
                     >
                        {/* Image Preview */}
                        {previewUrl ? (
                           <img
                              src={previewUrl}
                              alt="Profile Preview"
                              className="w-full h-full object-cover"
                              onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/112x112/f3f4f6/374151?text=Image+Error"; }}
                           />
                        ) : (
                           // Default Icon
                           <User className="w-10 h-10 text-gray-500" />
                        )}

                        <div className="absolute bottom-0 right-0 p-1 bg-purple-600 rounded-full border-2 border-white text-white z-100">
                           <Camera className="w-4 h-4 z-10" />
                        </div>
                     </label>

                     <p className="text-xs text-gray-500 mt-2">Upload Profile Picture</p>
                  </div>


                  {/* Username Input */}
                  <div>
                     <label className="block text-sm font-medium text-gray-700">Username</label>
                     <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="e.g., chat_master123"
                        className={`mt-1 block w-full px-4 py-2 border ${errors.username ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 text-sm`}
                        maxLength={20}
                     />
                     {errors.username && (
                        <p className="mt-1 text-xs text-red-600 font-medium">{errors.username}</p>
                     )}

                     <input
                        id="profilePictureInput"
                        type="file"
                        accept="image/*"
                        name="profilePicture"
                        onChange={handleChange}
                        className="hidden"
                     />
                  </div>

                  <button
                     type="submit"
                     className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-md text-base font-semibold text-white bg-purple-600 hover:bg-purple-700 transition duration-300 ease-in-out"
                  >
                     Save Profile
                  </button>
               </form>

            </div>
         </div>
      </div>
   );
};

export default ProfileSetup;