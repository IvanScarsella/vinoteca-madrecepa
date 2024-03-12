'use client';

import Image from 'next/image';
import imagen from '../../../../public/Moscatel.max-1600x900.png';
import wsp from '../../../../public/whatsapp_logo.png';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from 'axios';

type Product = {
  id: string,
  name: string,
  cellar: string,
  region: string,
  reserve: string,
  barrel: string,
  varietal: string[],
  milliliters: number,
  organic: boolean,
  image: string,
}

export default function Product(id: any) {


  const [product, setProduct] = useState<Product>()

  function getGradient(varietal: string[]) {
    let tinto = false
    let blanco = false
    let rosado = false

    for (const item of varietal) {
      if (
        item === 'Malbec' || /\bMalbec\b/.test(item) ||
        item === 'Carmenere' || /\bCarmenere\b/.test(item) ||
        item === 'Merlot' || /\bMerlot\b/.test(item) ||
        item === 'Cabernet' || /\bCabernet\b/.test(item) ||
        item === 'Syrah' || /\bSyrah\b/.test(item) ||
        item === 'Tempranillo' || /\bTempranillo\b/.test(item) ||
        item === 'Sangiovese' || /\bSangiovese\b/.test(item) ||
        item === 'Tannat' || /\bTannat\b/.test(item) ||
        item === 'Tinto' || /\bTinto\b/.test(item) ||
        item === 'Noir' || /\bNoir\b/.test(item) ||
        item === 'Bonarda' || /\bBonarda\b/.test(item)
      ) {
        tinto = true;
        break;
      }
    }

    for (const item of varietal) {
      if (
        item === 'Chardonnay' || /\bChardonnay\b/.test(item) ||
        item === 'Chenin' || /\bChenin\b/.test(item) ||
        item === 'Blanc' || /\bBlanc\b/.test(item) ||
        item === 'Semillón' || /\bSemillón\b/.test(item) ||
        item === 'Viognier' || /\bViognier\b/.test(item) ||
        item === 'Torrontés' || /\bTorrontés\b/.test(item)
      ) {
        blanco = true;
        break;
      }
    }

    for (const item of varietal) {
      if (
        item === 'Malbec Rosé' || /\bRose\b/.test(item) ||
        item === 'Rosado' || /\bRosado\b/.test(item)
      ) {
        rosado = true;
        break;
      }
    }

    if (tinto && !blanco && !rosado) { return 'from-[#18010e]' }
    if (!tinto && blanco && !rosado) { return 'from-[#60541322]' }
    if (!tinto && !blanco && rosado) { return 'from-[#d7315622]' }

    if (tinto && blanco && !rosado) { return 'from-[#18010e] to-[#60541322]' }
    if (tinto && !blanco && rosado) { return 'from-[#18010e] to-[#d7315622]' }
    if (!tinto && blanco && rosado) { return 'from-[#60541322] to-[#d7315622]' }

    if (tinto && blanco && rosado) { return 'from-[#18010e] via-[#60541322] to-[#d7315622]' }

  }

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(`/api/products/${id.params.id}`)
      setProduct(response.data)
    }

    getData()
  }, [])
  const router = useRouter();
  return (
    <main className={`
    flex flex-col p-8 gap-4 px-10
      ${product?.varietal ? `bg-gradient-to-br ${getGradient(product?.varietal)} bg-opacity-10` : null
      }

`}>
      <h1 className="text-white text-4xl xl:text-6xl text-center m-2 mb-4 font-bold underline decoration-2 underline-offset-4">
        {product?.name}
      </h1>
      <div className="flex flex-row max-sm:flex-col-reverse xl:px-40 sm:mx-10  max-h-[650px]">
        <div className="flex flex-col lg:text-3xl  max-sm:w-full justify-around max-sm:gap-4 mx-auto max-sm:flex-row max-sm:flex-wrap py-10">
          <h4 className="text-white max-sm:w-2/5">
            Bodega:
            <span className="text-xl lg:text-3xl font-bold text-[#AF3935]">
              {' '}
              {product?.cellar}
            </span>
          </h4>
          {product?.region ?
            <h4 className="text-white max-sm:w-2/5">
              Región:
              <span className="text-xl lg:text-3xl font-bold text-[#AF3935]">
                {' '}
                {product?.region}
              </span>
            </h4>
            : null}
          {product?.reserve ?
            <h4 className="text-white max-sm:w-2/5">
              Reserva:
              <span className="text-xl lg:text-3xl font-bold text-[#AF3935]">
                {' '}
                {product?.reserve}
              </span>{' '}
            </h4>
            : null}
          {product?.barrel ?
            <h4 className="text-white max-sm:w-2/5">
              Tiempo de Barrica:
              <span className="text-xl lg:text-3xl font-bold text-[#AF3935]">
                {' '}
                {product?.barrel}
              </span>
            </h4>
            : null}
          <h4 className="text-white max-sm:w-2/5">
            Cepa:
            <span className="text-xl lg:text-3xl font-bold text-[#AF3935]">
              {' '}
              {product?.varietal.join(', ')}
            </span>
          </h4>
          {/* <h4 className="text-white max-sm:w-2/5">
            Aromas:
            <span className="text-xl lg:text-3xl font-bold text-[#AF3935]">
            {' '}
            Frutos Rojos
            </span>
          </h4> */}
        </div>
        <div className="w-1/2 max-sm:self-center">
          <Image
            src={product?.image ? product.image : ''}
            alt="imagen"
            width={500}
            height={500}
          // className="max-w-full max-h-full"
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
    </main >
  );
}
