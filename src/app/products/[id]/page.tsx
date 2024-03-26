'use client';

import Image from 'next/image';
import imagen from '../../../../public/Moscatel.max-1600x900.png';
import wsp from '../../../../public/whatsapp_logo.png';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Wine, useGlobalContext } from '../../../../context/store';
import Loader from '@/app/components/Loader';

export default function Product(id: any) {
  const [product, setProduct] = useState<Wine>()
  const [type, setType] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [relatedProducts, setRelatedProducts] = useState<any[]>([])

  function getGradient(varietal: string[]) {

    if (!varietal) return 'from-[#101010] to-[#101010]'

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

    if (tinto && !blanco && !rosado) { return 'from-[#18010e] to-[#18010e]' }
    if (!tinto && blanco && !rosado) { return 'from-[#60541366] to-[#60541366]' }
    if (!tinto && !blanco && rosado) { return 'from-[#d7315620] to-[#d7315620]' }

    if (tinto && blanco && !rosado) { return 'from-[#18010e] to-[#60541366]' }
    if (tinto && !blanco && rosado) { return 'from-[#18010e] to-[#d7315666]' }
    if (!tinto && blanco && rosado) { return 'from-[#60541366] to-[#d7315666]' }

    if (tinto && blanco && rosado) { return 'from-[#18010e] via-[#60541366] to-[#d7315666]' }

    if (!tinto && !blanco && !rosado) { return 'from-[#d7315666] via-[#60541366] to-[#18010e]' }

  }
  const { totalProducts } = useGlobalContext()

  useEffect(() => {
    const getData = async () => {
      useContext
      const response = await axios.get(`/api/products`)
      const allPrpducts = [...response.data.wines, ...response.data.sparklings, ...response.data.otherDrinks, ...response.data.extras,]
      const Product = allPrpducts.find((product: any) => product.id === id.params.id)
      setProduct(Product)
      if (Product.type) setType(Product.type)
      if (Product.description) setDescription(Product.description)
    }
    getData()
  }, [id])

  useEffect(() => {
    const getRelated = async () => {
      const response = await axios.get(`/api/products/`)

      if (response.data.wines.filter((item: any) => item.cellar === product?.cellar)) {
        setRelatedProducts(response.data.sparklings.filter((item: any) => item.cellar === product?.cellar && item.id !== product?.id))
      }

      if (response.data.sparklings.filter((item: any) => item.cellar === product?.cellar)) {
        const otherProducts: any = response.data.sparklings.filter((item: any) => item.cellar === product?.cellar && item.id !== product?.id)
        setRelatedProducts(otherProducts)
      }

    }
    getRelated()
  }, [product])

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
        {product && Object.keys(product).length > 3 ?
          <div className="flex flex-col lg:text-3xl  max-sm:w-full justify-around max-sm:gap-4 mx-auto max-sm:flex-row max-sm:flex-wrap py-10">
            {product?.cellar ?
              <h4 className="text-white max-sm:w-2/5">
                Bodega:
                <span className="text-xl lg:text-3xl font-bold text-[#AF3935]">
                  {' '}
                  {product?.cellar}
                </span>
              </h4>
              : null}
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
            {type ?
              <h4 className="text-white max-sm:w-2/5">
                Tipo:
                <span className="text-xl lg:text-3xl font-bold text-[#AF3935]">
                  {' '}
                  {type}
                </span>
              </h4>
              : null}
            {product?.varietal ?
              <h4 className="text-white max-sm:w-2/5">
                Varietal:
                <span className="text-xl lg:text-3xl font-bold text-[#AF3935]">
                  {' '}
                  {product?.varietal.join(', ')}
                </span>
              </h4>
              : null}
            {description ?
              <h4 className="text-white max-sm:w-2/5">
                Variedades:
                <span className="text-xl lg:text-3xl font-bold text-[#AF3935]">
                  {' '}
                  {description}
                </span>
              </h4>
              : null}
          </div>
          : null}
        <div className={`${product && Object.keys(product).length > 3 ? 'w-1/2 ' : ' w-full flex flex-row justify-around'} max-sm:self-center`}>
          {product?.image ?
            <Image
              src={product?.image ? product.image : ''}
              alt="imagen"
              width={500}
              height={500}
            // className="max-w-full max-h-full"
            />
            : (<Loader />)}
        </div>
      </div>
      <h2 className="text-white text-2xl xl:text-5xl text-center mt-8">
        Consulte por este producto
      </h2>
      <div className="flex items-center justify-center ">
        <a
          href={`https://api.whatsapp.com/send/?phone=5492214942853&text=Hola,%20me%20gustaría%20consultar%20sobre%20este%20producto:%20https://www.vinotecamadrecepa.com.ar/products/${product?.id}`}
          target="_blank"
        >
          <Image
            className="hover:scale-125 max-xl:scale-75 max-xl:hover:scale-90"
            src={wsp}
            alt="whatsapp_logo"
            width={100}
            height={100}
          />
        </a>
      </div>
      {relatedProducts.length ? <>
        <h4 className="text-white text-3xl text-center my-4">Misma bodega</h4>
        <div className="flex flex-row max-md:flex-col">
          {relatedProducts ?
            relatedProducts.map((item) => (
              <div className="flex flex-col items-center w-1/2 max-md:w-full cursor-pointer mx-auto hover:scale-110" key={item.name}>
                <h4 className="text-white text-2xl text-center">{item.name}</h4>
                <div className="w-1/2">
                  <Image src={item.image} alt="imagen" width={1000} height={1000} onClick={() => router.push(`/products/${item.id}`)} />
                </div>
              </div>
            ))
            : null}
        </div>
      </> : null}
    </main >
  );
}
