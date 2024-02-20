import PromoCarousel from '@/app/components/PromoCarousel'
import CellarsCarousel from './components/CellarsCarousel';
import Image from 'next/image';
import imagen from '../../public/imagen.jpg'
import imagenLocal1 from '../../public/imagen_local_1.jpg'
import imagenLocal2 from '../../public/imagen_local_2.jpg'
import imagenLocal3 from '../../public/imagen_local_3.jpg'
import map from '../../public/map.png'
import facebookLogo from '../../public/facebook_logo.png'
import instagramLogo from '../../public/instagram_logo.png'
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col gap-4">
      <h1 className="main-text mx-auto mt-4 xl:text-4xl">
        Los mejores vinos de la ciudad los encontrás en
      </h1>
      <p className="text-6xl text-center text-red-600 xl:text-9xl">MAD</p>
      <PromoCarousel />
      <h1 className=' text-center text-4xl text-white xl:text-6xl'>Nuestras Bodegas</h1>
      <CellarsCarousel />
      <div className='flex flex-col xl:flex-row mx-20'>
        <div className='flex flex-col xl:w-1/2 xl:gap-4'>

          <h2 className=' text-center text-4xl text-white xl:text-6xl'>Nosotros</h2>
          <p className='main-text indent-2 text-justify mx-8 xl:mx-40 xl:text-xl'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo con. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatu. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id es. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, to. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur ma
            Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed qu. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut al Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatu</p>
        </div>
        <div className='w-1/4 justify-center mx-auto'>

          <Image
            src={imagen}
            alt='imagen'
            width={300}
            height={200}
            className='container'
          />
        </div>
      </div>
      <h2 className=' text-center text-4xl text-white'>Visitá nuestro local en Calle 123, City Bell</h2>
      <div className='flex flex-row flex-wrap justify-around xl:p-20'>
        <Image
          src={imagenLocal1}
          width={1500}
          height={1500}
          alt='imagen_local'
          className='xl:hover:scale-125 w-[144] xl:w-2/5 overflow-hidden m-2'
        />
        <Image
          src={imagenLocal2}
          width={1500}
          height={1500}
          alt='imagen_local'
          className='xl:hover:scale-125 w-[144] xl:w-2/5 overflow-hidden m-2'
        />
        <Image
          src={imagenLocal3}
          width={3000}
          height={1500}
          alt='imagen_local'
          className='xl-hover:scale-x-110 w-[346] xl:w-full overflow-hidden mt-28 max-xl:hidden'
        />
      </div>
      {/* <h2 className=' text-center text-4xl text-white'>Calle 123, City Bell</h2> */}
      <div className='w-1/2 mx-auto'>
        <Image
          src={map}
          alt='map'
          width={3000}
          height={3000}
          className='container'
        />
      </div>
      <div className='flex flex-col xl:flex-row  xl:m-4 xl:items-center xl:mx-auto xl:gap-16'>
        <h2 className=' text-center text-4xl text-white'>Seguinos en nuestras redes</h2>
        <div className='flex flex-row justify-around gap-10 mx-28 mb-4 xl:mx-2 xl:gap-20'>
          <Link href='https://www.facebook.com/vinoteca.madrecepa' target='_blank'>
            <Image
              src={facebookLogo}
              alt='Facebook logo'
              width={100}
              height={100}
              className='scale-125 hover:scale-150'
            />
          </Link>
          <Link href='https://www.instagram.com/vinotecamadrecepa/' target='_blank'>
            <Image
              src={instagramLogo}
              alt='Instagram logo'
              width={100}
              height={100}
              className='hover:scale-125'
            />
          </Link>
        </div>
      </div>
    </main>
  );
}
