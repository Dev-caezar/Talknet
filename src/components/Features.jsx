import React from 'react'
import { UserPlus, ShieldCheck, Clock } from 'lucide-react'

const Features = () => {
   const featuresData = [
      {
         icon: UserPlus,
         title: "Quick Onboarding",
         description:
            "Get started in minutes! Our seamless onboarding process ensures you can begin chatting with customers right away.",
         iconBgColor: "#FFEAD4",
         iconColor: "#FF8A00",
      },
      {
         icon: ShieldCheck,
         title: "Secure Chat",
         description:
            "Maintain customer trust with end-to-end encryption. All your conversations and data are kept safe and private.",
         iconBgColor: "#EAF5E8",
         iconColor: "#7AA975",
      },
      {
         icon: Clock,
         title: "Boost Efficiency",
         description:
            "Integrated tools and smart workflows help you manage communication easily, freeing up your team's valuable time.",
         iconBgColor: "#FEEAE6",
         iconColor: "#F56565",
      },
   ];

   return (
      <div className="w-full py-16 flex justify-center items-center bg-white">
         <div className="w-[90%] max-w-7xl flex flex-col items-center justify-center gap-8">
            <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl text-center">
               Features for a better experience
            </h2>

            <div className="w-full flex flex-wrap justify-center items-center gap-6 md:gap-10">
               {featuresData.map((item, index) => (
                  <div
                     key={index}
                     className="w-[90%] sm:w-[320px] md:w-[350px] lg:w-[370px] h-auto sm:h-[230px] shadow-md rounded-2xl flex justify-center items-center p-5 hover:shadow-lg transition-all duration-300"
                  >
                     <div className="w-full flex flex-col items-center gap-4 text-center">
                        <div
                           className="w-16 h-16 rounded-full flex justify-center items-center"
                           style={{ backgroundColor: item.iconBgColor }}
                        >
                           <span style={{ color: item.iconColor }}>
                              <item.icon className="size-[32px]" />
                           </span>
                        </div>

                        <h4 className="font-semibold text-lg sm:text-xl">
                           {item.title}
                        </h4>

                        <p className="text-sm sm:text-[15px] text-gray-700 font-medium leading-relaxed">
                           {item.description}
                        </p>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
};

export default Features;
