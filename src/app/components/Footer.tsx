import Image from "next/image";
import logo from '../../../public/logo.jpg';

export default function Nav() {
   const itemsNav = [
      { title: 'Tintos' },
      { title: 'Blancos' },
      { title: 'Rosados' },
      { title: 'Espumantes' },
      { title: 'Aperitivos' },
   ]

   return (
      <div className="bg-[#AF3935] h-full">
         <div className="flex flex-row justify-center items-center p-4">
            <div className="w-1/3 p-4">
               <Image
                  src={logo}
                  alt='logo'
                  width={48}
                  height={48}
                  className='container'
               />
            </div>
            <div className="w-1/3 p-4">
               <div className="w-full">
                  {itemsNav.map(item => (
                     <div className="flex flex-row items-center justify-center p-1 gap-2 pl-2">
                        {/* <IoIosWine /> */}
                        <p className="text-base text-white">{item.title}</p>
                     </div>
                  ))}
               </div>
            </div>
            <div className="w-1/3 p-4 text-base flex flex-col justify-center gap-2">
               <p>Teléfono:</p>
               <p>123456789</p>
               <p>mail@mail.com</p>
               <p>Calle 123</p>
               <p>City Bell</p>
            </div>
         </div>
         <div className="flex flex-row justify-center p-4">
            <p>Desarrollado por Iván Scarsella</p>
         </div>
      </div>
   );
}