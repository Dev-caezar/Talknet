"use client"
import { motion } from "framer-motion"
import { ArrowRight, Star } from "lucide-react"
import HeroImg from "../assets/public/heroImg.png"
import SmallImgs from "../assets/public/small-photos.png"

export default function Hero() {
   return (
      <section className="min-h-screen flex items-center justify-center pt-24 pb-20 relative overflow-hidden bg-white">
         <div className="relative w-[90%] h-full flex flex-col md:flex-row items-center justify-between gap-5 md:gap-12 lg:gap-8">

            <motion.div
               initial={{ opacity: 0, x: -60 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 1, ease: "easeOut" }}
               className="w-full md:w-1/2 h-full flex flex-col justify-center gap-6 md:gap-8 order-2 md:order-1"
            >
               <div className="flex flex-col gap-4">
                  <h1 className="text-4xl sm:text-5xl lg:text-5xl font-bold leading-tight text-balance">
                     Chat and connect with anyone, anytime with TalkNet
                  </h1>
                  <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-gray-600">
                     TalkNet makes communication simple and social. Stay connected with friends, customers, or communities effortlessly, from anywhere in the world.
                  </p>
               </div>

               <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="w-full sm:w-72 h-14 bg-purple-600 text-white rounded-xl px-8 py-4 text-lg font-semibold flex items-center justify-center gap-2 shadow-lg"
               >
                  Start chatting now
                  <ArrowRight className="w-5 h-5" />
               </motion.button>

               <div className="flex flex-col gap-6 pt-6">
                  <div className="w-full md:w-[65%] flex items-center justify-start gap-8">

                     <div className="flex-1 max-w-[120px]">
                        <img src={SmallImgs} alt="Active users on TalkNet" className="rounded-md" />
                     </div>

                     <div className="flex flex-col items-start gap-1.5">
                        <div className="text-2xl font-bold leading-none">2,291</div>
                        <h4 className="text-sm">Happy Users</h4>
                     </div>

                     <div className="w-px h-12 bg-gray-300"></div>

                     <div className="flex flex-col items-start gap-1.5">
                        <h4 className="text-2xl font-bold leading-none">4.8/5</h4>
                        <div className="flex items-center">
                           <div className="flex gap-0.5 mr-2">
                              {[...Array(4)].map((_, i) => (
                                 <Star key={`filled-${i}`} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                              ))}
                              <Star key="empty-star" className="w-4 h-4 text-gray-300" />
                           </div>
                           <h4 className="text-sm leading-none text-gray-600">Rating</h4>
                        </div>
                     </div>
                  </div>
               </div>
            </motion.div>

            <motion.div
               initial={{ opacity: 0, x: 60 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 1, ease: "easeOut" }}
               className="w-full md:w-1/2 h-full flex items-center justify-center order-1 md:order-2 mt-0 md:mt-0"
            >
               <motion.img
                  src={HeroImg}
                  alt="User chatting on TalkNet app"
                  className="w-full md:w-[90%] h-full object-contain"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
               />
            </motion.div>
         </div>
      </section>
   )
}