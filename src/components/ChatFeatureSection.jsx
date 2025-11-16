"use client"
import { motion } from "framer-motion"
import { MessageSquare, ThumbsUp, Paperclip, ArrowRight } from "lucide-react"
import Mockup from "../assets/public/chat-feature.png"


export default function ChatFeatureSection() {
   return (
      <section className="py-10 md:py-20 overflow-hidden">
         <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-16 lg:gap-24">
               <motion.div
                  initial={{ opacity: 0, x: -80 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="w-full md:w-1/2 flex justify-center order-2 md:order-1 relative"
               >
                  <motion.div
                     className="relative w-full max-w-sm"
                     whileHover={{ y: -8 }}
                     transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                     <div className="absolute inset-0 bg-linear-to-r from-amber-400/30 to-orange-400/30 rounded-3xl blur-3xl -z-10" />
                     <img
                        src={Mockup}
                        alt="Mobile Chat Application Mockup"
                        className="w-full rounded-3xl shadow-2xl border border-amber-200/40 object-cover"
                     />
                  </motion.div>
               </motion.div>

               <motion.div
                  initial={{ opacity: 0, x: 80 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                  className="w-full md:w-1/2 flex flex-col items-start gap-8 order-1 md:order-2"
               >
                  <div className="flex flex-col gap-4">
                     <motion.h2
                        className="text-5xl sm:text-6xl font-bold leading-tight text-gray-900"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                     >
                        Connect, share,
                        <span className="bg-linear-to-r from-purple-500 to-purple-300 bg-clip-text text-transparent">
                           {" "}
                           thrive
                        </span>
                     </motion.h2>
                     <motion.p
                        className="text-xl text-gray-600 leading-relaxed max-w-xl font-light"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                     >
                        Seamless messaging for teams, friends, and communities. Real-time conversations, rich media sharing, and
                        effortless group collaboration.
                     </motion.p>
                  </div>

                  <motion.div
                     className="flex flex-col gap-5 w-full"
                     initial={{ opacity: 0 }}
                     whileInView={{ opacity: 1 }}
                     transition={{ duration: 0.8, delay: 0.3, staggerChildren: 0.1 }}
                  >
                     {[
                        {
                           icon: ThumbsUp,
                           title: "Instant Messaging",
                           desc: "Send and receive messages in real-time with intuitive controls and zero latency.",
                        },
                        {
                           icon: Paperclip,
                           title: "Rich Media Sharing",
                           desc: "Share photos, videos, and documents instantly with your contacts seamlessly.",
                        },
                        {
                           icon: MessageSquare,
                           title: "Group Collaboration",
                           desc: "Create and manage group conversations for teams, projects, and communities effortlessly.",
                        },
                     ].map((feature, idx) => (
                        <motion.div
                           key={idx}
                           className="flex items-start gap-4 p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-purple-200/40 hover:border-purple-300/60 transition-colors"
                           whileHover={{ x: 8 }}
                           transition={{ type: "spring", stiffness: 400 }}
                        >
                           <feature.icon className="w-6 h-6 text-purple-400 shrink-0 mt-1" />
                           <div className="flex flex-col gap-1">
                              <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                              <p className="text-gray-600 text-sm leading-relaxed">{feature.desc}</p>
                           </div>
                        </motion.div>
                     ))}
                  </motion.div>

                  <motion.button
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.8, delay: 0.5 }}
                     whileHover={{ scale: 1.05 }}
                     whileTap={{ scale: 0.98 }}
                     className="inline-flex items-center gap-2 px-8 py-4 bg-linear-to-r from-purple-500 to-purple-300 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-purple-500/40 transition-shadow"
                  >
                     Start Chatting Now
                     <ArrowRight className="w-5 h-5" />
                  </motion.button>
               </motion.div>
            </div>
         </div>
      </section>
   )
}
