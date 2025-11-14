import React from 'react';

const Footer = () => {
   return (
      <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">

         <div className="max-w-4xl mx-auto text-center pb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
               Ready to grow your business? Start with Talknet, become faster every second
            </h2>
            <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-xl shadow-lg transition duration-300">
               Start Chatting Now
            </button>
         </div>

         <hr className="border-gray-200" />
         <div className="max-w-6xl mx-auto pt-10 flex flex-col md:flex-row justify-between items-center text-sm">
            <div className="flex flex-col md:flex-row items-center md:space-x-8 mb-6 md:mb-0">
               <span className="text-2xl font-extrabold text-purple-600">Talknet</span>
               <p className="text-gray-500 mt-4 md:mt-0">© Copyright 2022, All Rights Reserved</p>
            </div>
            <div className="flex space-x-6 text-gray-700 font-medium mb-6 md:mb-0">
               <a href="#" className="hover:text-purple-600 transition duration-150">About</a>
               <a href="#" className="hover:text-purple-600 transition duration-150">Features</a>
               <a href="#" className="hover:text-purple-600 transition duration-150">Works</a>
               <a href="#" className="hover:text-purple-600 transition duration-150">Support</a>
            </div>
            <div className="flex flex-col items-center md:items-end space-y-4 md:space-y-0">
               <div className="flex space-x-4 mb-4 md:mb-0 text-purple-600">
                  <a href="#" className="hover:text-purple-400 transition duration-150">
                     <i className="fab fa-twitter"></i>
                     <span className="sr-only">Twitter</span>
                  </a>
                  <a href="#" className="hover:text-purple-400 transition duration-150">
                     <i className="fab fa-facebook-f"></i>
                     <span className="sr-only">Facebook</span>
                  </a>
                  <a href="#" className="hover:text-purple-400 transition duration-150">
                     <i className="fab fa-instagram"></i>
                     <span className="sr-only">Instagram</span>
                  </a>
                  <a href="#" className="hover:text-purple-400 transition duration-150">
                     <i className="fab fa-github"></i>
                     <span className="sr-only">GitHub</span>
                  </a>
               </div>

               <div className="flex space-x-4 text-gray-500">
                  <a href="#" className="hover:text-purple-600 transition duration-150">Privacy Policy</a>
                  <a href="#" className="hover:text-purple-600 transition duration-150">Terms & Conditions</a>
               </div>
            </div>

         </div>
      </div>
   );
};

export default Footer;