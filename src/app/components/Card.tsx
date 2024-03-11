'use client';

import Image from 'next/image';
// import image from '../../../public/Moscatel.max-1600x900.png';
import { useRouter } from 'next/navigation';

export default function Card(data: any) {
  const {
    name,
    cellar,
    image,
    barrel,
    region,
    reserve,
    varietal,
    id
  } = data.data

  const router = useRouter();

  return (
    <div
      className="bg-gray-900 text-white border border-gray-700 shadow-lg rounded-xl overflow-hidden flex flex-col items-center hover:shadow-xl cursor-pointer xl:w-1/4 sm:w-5/12 p-2  hover:scale-110 hover:shadow-black"
      onClick={() => router.push(`/products/${id}`)}
    >
      <div className="w-[300px] max-sm:w-[400px] flex flex-row justify-center p-2">
        <div className="relative w-60 h-80 max-sm:w-[200px] max-sm:h-[300px] ">
          <Image
            src={image}
            alt="imagen"
            layout="fill"
            objectFit="cover"
            className="rounded-xl rounded-bl-xl"
          />
        </div>
      </div>
      <div className="flex flex-col justify-around items-center p-2 xl:p-6 max-xl:justify-evenly">
        <h3 className="text-lg xl:text-4xl font-bold">{name}</h3>
        <div className="bg-[#AF3935] rounded-full w-2 h-2 xl:w-3 xl:h-3 m-4" />
        <p className="text-base xl:text-xl font-semibold text-gray-300">{cellar}</p>
      </div>
    </div>
  );
}
