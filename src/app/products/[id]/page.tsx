'use client'

import Image from "next/image";
import imagen from '../../../../public/Moscatel.max-1600x900.png'
import wsp from '../../../../public/whatsapp_logo.png'
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Product() {
   const router = useRouter()
   return (
      <main className="flex flex-col p-8 gap-4 xl:px-20">
         <h1 className="text-white text-4xl xl:text-6xl text-center m-2 mb-4">Nombre del Vino</h1>
         <div className="flex flex-row xl:px-80">
            <div className="flex flex-col xl:text-3xl w-1/2 justify-around">
               <h4 className="text-white">Bodega: Los Sarasa</h4>
               <h4 className="text-white">Cepa: Malbec</h4>
               <h4 className="text-white">Región: Mendoza</h4>
               <h4 className="text-white">Reserva: ...</h4>
               <h4 className="text-white">Tiempo de Barrica: ...</h4>
               <h4 className="text-white">Aromas: Frutos Rojos</h4>
            </div>
            <div className="w-1/2">
               <Image
                  src={imagen}
                  alt='imagen'
                  width={1000}
                  height={1000}
               />
            </div>
         </div>
         <h2 className="text-white text-2xl xl:text-5xl text-center">Consulte por este producto</h2>
         <div className="flex items-center justify-center ">
            <Link href="https://api.whatsapp.com/send/?phone=5492214942853" target="_blank">
               <Image
                  className='hover:scale-125 max-xl: scale-75 max-xl:hover:scale-90'
                  src={wsp}
                  alt="whatsapp_logo"
                  width={100}
                  height={100}
               />
            </Link>
         </div>
         <h4 className="text-white text-2xl text-center">Misma bodega</h4>
         <div className="flex flex-row">
            <div className="flex flex-col items-center w-1/2">
               <h4 className="text-white text-2xl text-center">Otro vino</h4>
               <div className="w-1/2">
                  <Image
                     src={imagen}
                     alt='imagen'
                     width={1000}
                     height={1000}
                  />
               </div>
            </div>
            <div className="flex flex-col items-center w-1/2 cursor-pointer"
               onClick={() => router.push('/')}
            >
               <h4 className="text-white text-2xl text-center">Otro vino</h4>
               <div className="w-1/2">
                  <Image
                     src={imagen}
                     alt='imagen'
                     width={1000}
                     height={1000}
                  />
               </div>
            </div>
         </div>
      </main>
   )
}