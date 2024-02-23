'use client';

import Image from 'next/image';
import image from '../../../public/Moscatel.max-1600x900.png';
import { useRouter } from 'next/navigation';

export default function Card() {
  const router = useRouter();

  return (
    <div
      className="bg-gray-900 text-white border border-gray-700 shadow-lg rounded-xl overflow-hidden flex flex-row justify-around hover:shadow-xl cursor-pointer xl:w-1/4 sm:w-5/12"
      onClick={() => router.push('/products/1')}
    >
      <div className="w-1/3">
        <div className="relative w-full h-80">
          <Image
            src={image}
            alt="imagen"
            layout="fill"
            objectFit="cover"
            className="rounded-tl-xl rounded-bl-xl"
          />
        </div>
      </div>
      <div className="flex flex-col justify-around items-center p-2 xl:p-6 max-xl:justify-evenly">
        <h3 className="text-lg xl:text-2xl font-bold">Nombre del Vino</h3>
        <div className="bg-[#AF3935] rounded-full w-2 h-2 xl:w-3 xl:h-3 mb-2 xl:mb-4" />
        <p className="text-base xl:text-lg font-semibold">Malbec</p>
      </div>
    </div>
  );
}
