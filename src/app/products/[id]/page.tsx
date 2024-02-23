'use client';

import Image from 'next/image';
import imagen from '../../../../public/Moscatel.max-1600x900.png';
import wsp from '../../../../public/whatsapp_logo.png';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Product() {
  const router = useRouter();
  return (
    <main className="flex flex-col p-8 gap-4 px-10">
      <h1 className="text-[#AF3935] text-4xl xl:text-6xl text-center m-2 mb-4 font-bold">
        Nombre del Vino
      </h1>
      <div className="flex flex-row max-sm:flex-col-reverse xl:px-40 sm:mx-10  max-h-[650px]">
        <div className="flex flex-col lg:text-3xl  max-sm:w-full justify-around max-sm:gap-4 mx-auto max-sm:flex-row max-sm:flex-wrap py-10">
          <h4 className="text-white max-sm:w-2/5">
            Bodega:
            <span className="text-xl lg:text-3xl font-bold text-[#AF3935]">
              {' '}
              Los Sarasa
            </span>
          </h4>
          <h4 className="text-white max-sm:w-2/5">
            Cepa:
            <span className="text-xl lg:text-3xl font-bold text-[#AF3935]">
              {' '}
              Malbec
            </span>
          </h4>
          <h4 className="text-white max-sm:w-2/5">
            Región:
            <span className="text-xl lg:text-3xl font-bold text-[#AF3935]">
              {' '}
              Mendoza
            </span>
          </h4>
          <h4 className="text-white max-sm:w-2/5">
            Reserva:
            <span className="text-xl lg:text-3xl font-bold text-[#AF3935]">
              ...
            </span>{' '}
          </h4>
          <h4 className="text-white max-sm:w-2/5">
            Tiempo de Barrica:
            <span className="text-xl lg:text-3xl font-bold text-[#AF3935]">
              {' '}
              ...
            </span>
          </h4>
          <h4 className="text-white max-sm:w-2/5">
            Aromas:
            <span className="text-xl lg:text-3xl font-bold text-[#AF3935]">
              {' '}
              Frutos Rojos
            </span>
          </h4>
        </div>
        <div className="w-1/2 max-sm:self-center">
          <Image
            src={imagen}
            alt="imagen"
            width={1600}
            height={900}
            className="max-w-full max-h-full"
          />
        </div>
      </div>
      <h2 className="text-white text-2xl xl:text-5xl text-center">
        Consulte por este producto
      </h2>
      <div className="flex items-center justify-center ">
        <Link
          href="https://api.whatsapp.com/send/?phone=5492214942853"
          target="_blank"
        >
          <Image
            className="hover:scale-125 max-xl: scale-75 max-xl:hover:scale-90"
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
            <Image src={imagen} alt="imagen" width={1000} height={1000} />
          </div>
        </div>
        <div
          className="flex flex-col items-center w-1/2 cursor-pointer"
          onClick={() => router.push('/')}
        >
          <h4 className="text-white text-2xl text-center">Otro vino</h4>
          <div className="w-1/2">
            <Image src={imagen} alt="imagen" width={1000} height={1000} />
          </div>
        </div>
      </div>
    </main>
  );
}
