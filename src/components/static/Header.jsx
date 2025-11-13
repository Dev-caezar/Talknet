"use client"
import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import logo from "../../assets/public/talknet.png"

const Header = () => {
   const navs = ["Home", "About", "Contact", "Blog"]
   const [isScrolled, setIsScrolled] = useState(false)
   const [menuOpen, setMenuOpen] = useState(false)

   useEffect(() => {
      const handleScroll = () => setIsScrolled(window.scrollY > 50)
      window.addEventListener("scroll", handleScroll)
      return () => window.removeEventListener("scroll", handleScroll)
   }, [])

   return (
      <motion.div
         initial={{ opacity: 0, y: -30 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.8, ease: "easeOut" }}
         className={`sticky top-0 left-0 w-full h-[12vh] flex justify-center items-center z-30 backdrop-blur-2xl transition-all duration-700 ${isScrolled
            ? "bg-white/90 shadow-md text-gray-900"
            : "bg-transparent text-black"
            }`}
      >
         <div className="w-[90%] h-full flex justify-between items-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20">
               <motion.img
                  src={logo}
                  alt="logo"
                  className="w-full h-full object-contain"
                  whileHover={{ scale: 1.1, rotate: 3 }}
                  transition={{ type: "spring", stiffness: 200 }}
               />
            </div>

            <div
               className={`hidden md:flex w-[45%] h-full justify-between items-center font-medium ${isScrolled ? "text-gray-800" : "text-black"
                  }`}
            >
               {navs.map((nav, index) => (
                  <motion.h4
                     key={index}
                     whileHover={{ y: -3, scale: 1.05 }}
                     transition={{ type: "spring", stiffness: 250 }}
                     className="cursor-pointer hover:text-purple-400"
                  >
                     {nav}
                  </motion.h4>
               ))}
            </div>

            <div className="hidden md:flex w-[22%] h-full justify-between items-center">
               <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className={`w-24 sm:w-28 h-10 sm:h-12 text-sm sm:text-base font-semibold rounded-lg shadow-md transition-all duration-300 ${isScrolled
                     ? "bg-purple-600 text-white"
                     : "bg-white text-purple-600"
                     }`}
               >
                  Login
               </motion.button>

               <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className={`w-24 sm:w-28 h-10 sm:h-12 text-sm sm:text-base font-semibold rounded-lg shadow-md transition-all duration-300 ${isScrolled
                     ? "bg-white text-purple-600"
                     : "bg-purple-600 text-white"
                     }`}
               >
                  Sign Up
               </motion.button>
            </div>

            <div className="flex md:hidden">
               <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="text-2xl focus:outline-none"
               >
                  {menuOpen ? <X size={28} /> : <Menu size={28} />}
               </button>
            </div>
         </div>

         <AnimatePresence>
            {menuOpen && (
               <>
                  <motion.div
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 0.4 }}
                     exit={{ opacity: 0 }}
                     transition={{ duration: 0.3 }}
                     onClick={() => setMenuOpen(false)}
                     className="fixed inset-0 bg-black z-30 md:hidden"
                  ></motion.div>

                  <motion.div
                     initial={{ x: "100%" }}
                     animate={{ x: 0 }}
                     exit={{ x: "100%" }}
                     transition={{ type: "spring", stiffness: 100, damping: 20 }}
                     className={`fixed top-0 right-0 w-[75%] sm:w-[60%] h-screen bg-white z-40 flex flex-col items-center gap-6 shadow-2xl md:hidden ${isScrolled ? "text-gray-900" : "text-black"
                        }`}
                  >
                     <div className="w-[80%] h-20 flex justify-end items-center">
                        <button
                           onClick={() => setMenuOpen(false)}
                           className="text-2xl"
                        >
                           <X size={28} />
                        </button>
                     </div>

                     {navs.map((nav, index) => (
                        <motion.h4
                           key={index}
                           whileHover={{ scale: 1.05 }}
                           transition={{ type: "spring", stiffness: 250 }}
                           className="text-start py-2 text-xl cursor-pointer hover:text-purple-600"
                        >
                           {nav}
                        </motion.h4>
                     ))}

                     <div className="mt-4 flex flex-col gap-4 w-[70%]">
                        <motion.button
                           whileHover={{ scale: 1.05 }}
                           whileTap={{ scale: 0.95 }}
                           transition={{ type: "spring", stiffness: 300 }}
                           className="w-full h-10 py-3 bg-purple-600 text-white rounded-lg shadow-md font-semibold"
                        >
                           Login
                        </motion.button>
                        <motion.button
                           whileHover={{ scale: 1.05 }}
                           whileTap={{ scale: 0.95 }}
                           transition={{ type: "spring", stiffness: 300 }}
                           className="w-full h-10 py-3 bg-white text-purple-600 border border-purple-600 rounded-lg shadow-md font-semibold"
                        >
                           Sign Up
                        </motion.button>
                     </div>
                  </motion.div>
               </>
            )}
         </AnimatePresence>
      </motion.div>
   )
}

export default Header
