import Image from "next/image";
import image from '../../../public/Moscatel.max-1600x900.png'

export default function Card() {
   return (
      <div className="bg-white bg-opacity-70 border-[#325481] border-opacity-60 border-4 border-dotted flex flex-row justify-around hover:scale-110 cursor-pointer xl:w-2/5">
         <div className="xl:h-64">
            <Image
               src={image}
               alt="imagen"
               width={100}
               height={200}
               className="container"
            />
         </div>
         <div className="flex flex-col justify-around items-center py-4 xl:py-8">
            <h3 className="text-black text-2xl xl:text-4xl">Vino</h3>
            <div className="bg-black rounded-full w-1 h-1 xl:w-2 xl:h-2" />
            <p className="text-black text-xl xl:text-2xl">Malbec</p>
         </div>
      </div>
   )
}