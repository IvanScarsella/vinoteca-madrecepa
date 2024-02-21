'use client'

import { IoMenu } from "react-icons/io5";
import logo from '../../../public/logo.jpg';
import Image from "next/image";
import { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { IoIosWine } from "react-icons/io";

export default function Nav() {

   const [toggle, setToggle] = useState<boolean>(false)

   const itemsNav = [
      { title: 'Tintos' },
      { title: 'Blancos' },
      { title: 'Rosados' },
      { title: 'Espumantes' },
      { title: 'Aperitivos' },
   ]

   return (
      <>
         <div className=" flex-col">
            <div className=" bg-[#AF3935] flex flex-row justify-between xl:justify-around items-center p-4">
               <div className="w-16 h-16">
                  <Image
                     src={logo}
                     alt='logo'
                     width={48}
                     height={48}
                     className='w-full h-full'
                  />
               </div>
               <div className="w-16 h-16 xl:hidden" hidden={toggle} >
                  <IoMenu className="w-full h-full" onClick={() => setToggle(toggle => !toggle)} />
               </div>
               <div className="w-16 h-16 xl:hidden" hidden={!toggle} >
                  <RxCross1 className="w-full h-full" onClick={() => setToggle(toggle => !toggle)} />
               </div>
               {/* <div className="flex flex-row"> */}
               {itemsNav.map(item => (
                  <div className="flex flex-row items-center p-1 gap-2 pl-2 max-xl:hidden">
                     <IoIosWine />
                     <p className="text-2xl text-white">{item.title}</p>
                  </div>
               ))}
               {/* </div> */}
            </div>
         </div>
         {toggle ?
            <div className="bg-[#903431]  w-full  xl:hidden">
               {itemsNav.map(item => (
                  <div className="flex flex-row items-center p-1 gap-2 pl-2">
                     <IoIosWine />
                     <p className="text-2xl">{item.title}</p>
                  </div>
               ))}
            </div>
            : null
         }
      </>
   );
}