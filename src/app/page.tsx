'use client'

import PhotosCarousel from '@/app/components/PhotosCarousel';
import CellarsCarousel from './components/CellarsCarousel';
import CellarsCarousel2 from './components/CellarsCarousel2';
import Image from 'next/image';
import imagen from '../../public/imagen.jpg';
import logo from '../../public/logo.png'
import imagenLocal1 from '../../public/imagen_local_1.jpg';
import imagenLocal2 from '../../public/imagen_local_2.jpg';
import imagenLocal3 from '../../public/imagen_local_3.jpg';
import map from '../../public/map.png';
import facebookLogo from '../../public/facebook_logo.png';
import instagramLogo from '../../public/instagram_logo.png';
import xLogo from '../../public/x_logo.jpg';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Wine, useGlobalContext } from '../../context/store';
import GoogleMap from './components/GoogleMap';

export default function Home() {

  const [cellars, setCellars] = useState<Wine[]>([])

  const { wines, setProducts } = useGlobalContext();
  useEffect(() => {
    const getRelated = async () => {
      try {
        const uniqueCellars: Wine[] = [];

        for (let i = 0; i < wines.length; i++) {
          const product = wines[i];

          const existingCellarIndex = uniqueCellars.findIndex((item: Wine) => item.cellar === product.cellar);

          if (existingCellarIndex === -1) {
            uniqueCellars.push(product);
          }
        }

        const randomComparator = () => Math.random() - 0.5;

        const shuffleCellars = uniqueCellars.sort(randomComparator);

        setCellars(shuffleCellars)
      } catch (error) {
        console.error('Error al obtener los productos relacionados:', error);
      }
    };
    getRelated()
  }, [wines])

  return (
    <main className="flex flex-col gap-4 px-4">
      <div className='flex flex-col gap-4 lg:gap-0 justify-around mt-6'>

        <h1 className="text-white text-4xl mx-auto mt-6 max-lg:text-lg tracking-tighter">
          Los mejores vinos de City Bell están en
        </h1>
        {/* <p className="text-6xl text-center text-red-600 xl:text-9xl">MAD</p> */}
        <div className='h-48 w-48 lg:h-96  lg:w-96 self-center'>

          <Image
            src={logo}
            alt='logo'
            width={200}
            height={200}
            className='container'
          />
        </div>
        <h1 className=" text-center text-2xl sm:text-4xl text-white xl:text-6xl">
          Nuestras Bodegas
        </h1>
      </div>
      <div className='max-md:hidden'>
        <CellarsCarousel cellars={cellars} />
      </div>
      <div className='md:hidden'>
        <CellarsCarousel2 cellars={cellars} />
      </div>
      <div className="flex flex-col xl:flex-row mx-8 mb-2">
        <div className="flex flex-col justify-around xl:w-1/2">
          <h2 className=" text-center text-4xl text-white xl:text-6xl mb-4">
            Nosotros
          </h2>
          <p className="main-text indent-2 text-justify mb-4 xl:mx-10 xl:text-2xl max-xl:text-sm">
            Imagina una pareja de cantantes de ópera, cuyas voces envueltas en el amor por los buenos vinos, naufragan en un complejo laberinto  de melodías, aromas y emociones. Juntos, exploran un mundo de sensaciones y sabores únicos, donde cada botella es una joya por descubrir. Con pasión y conocimiento, comparten la magia de la música y la exquisitez de los vinos selectos con quienes tienen el privilegio de escucharlos y probarlos. Su compromiso con la excelencia y el placer es evidente en cada actuación y degustación, cautivando corazones y paladares con su arte y su generosidad. Como verdaderos maestros de la armonía, inspiran a otros a vivir con intensidad y a apreciar las pequeñas maravillas que la vida tiene para ofrecer, convirtiendo cada encuentro en una experiencia inolvidable.
          </p>
        </div>
        <div className="max-sm:h-[324px] max-sm:w-[216px] h-[324px] w-[270px] xl:h-[630px] xl:w-[525px] flex justify-center xl:flex-row xl:items-center mx-auto p-2 border-4 border-double border-[#cfab46]">
          <Image
            src={imagen}
            alt="imagen"
            width={634}
            height={748}
            className="container h-[300px] w-[250px] xl:h-[596px] xl:w-[496px]"
          />
        </div>
      </div>
      <PhotosCarousel />
      <div className="flex flex-col xl:gap-8">
        <h2 className="text-xl xl:text-3xl  text-white mx-auto">
          Visitá nuestro local
        </h2>
        <h2 className="text-xl xl:text-3xl  text-white mx-auto">
          Calle 472 esquina 13b, City Bell
        </h2>
      </div>
      <div className="flex flex-row flex-wrap justify-around xl:p-10 mx-6">
        <Image
          src={imagenLocal1}
          width={1500}
          height={1500}
          alt="imagen_local"
          className="xl:hover:scale-125 w-[144] xl:w-2/5 overflow-hidden m-2"
        />
        <Image
          src={imagenLocal2}
          width={1500}
          height={1500}
          alt="imagen_local"
          className="xl:hover:scale-125 w-[144] xl:w-2/5 overflow-hidden m-2"
        />
        <Image
          src={imagenLocal3}
          width={3000}
          height={1500}
          alt="imagen_local"
          className="xl-hover:scale-x-110 w-[346] xl:w-full overflow-hidden mt-28 max-xl:hidden"
        />
      </div>
      {/* <h2 className=' text-center text-4xl text-white'>Calle 123, City Bell</h2> */}
      <div className="w-2/3 h-80 mx-auto">
        {/* <Image
          src={map}
          alt="map"
          width={3000}
          height={3000}
          className="container"
        /> */}
        <GoogleMap />
      </div>
      <div className="flex flex-col xl:flex-row  xl:m-4 xl:items-center xl:mx-auto gap-4 xl:gap-16">
        <h2 className=" text-center text-xl xl:text-3xl text-white mx-8">
          Seguinos en nuestras redes
        </h2>
        <div className="flex flex-row justify-around gap-10 sm:mx-28 mb-4 xl:mx-2 xl:gap-20">
          <Link
            href="https://www.facebook.com/vinoteca.madrecepa"
            target="_blank"
          >
            <div className='w-12 sm:w-16 '>
              <Image
                src={facebookLogo}
                alt="Facebook logo"
                width={100}
                height={100}
                className="scale-125 hover:scale-150"
              />
            </div>
          </Link>
          <Link
            href="https://www.instagram.com/vinotecamadrecepa/"
            target="_blank"
          >
            <div className='w-12 sm:w-16 '>
              <Image
                src={instagramLogo}
                alt="Instagram logo"
                width={100}
                height={100}
                className="hover:scale-125"
              />
            </div>
          </Link>
          <Link
            href="https://twitter.com/vinosmadrecepa"
            target="_blank"
          >
            <div className='w-12 sm:w-16 '>
              <Image
                src={xLogo}
                alt="Instagram logo"
                width={100}
                height={100}
                className="hover:scale-125 rounded-full"
              />
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
