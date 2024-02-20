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
      <h1 className="main-text mx-auto mt-4">
        Los mejores vinos de la ciudad los encontrás en
      </h1>
      <p className="text-6xl text-center text-red-600">MAD</p>
      <PromoCarousel />
      <h1 className=' text-center text-4xl text-white'>Nuestras Bodegas</h1>
      <CellarsCarousel />
      <h2 className=' text-center text-4xl text-white'>Nosotros</h2>
      <p className='main-text indent-2 text-justify mx-8'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo con. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatu. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id es. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, to. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur ma
        Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed qu. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut al Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatu</p>
      <Image
        src={imagen}
        alt='imagen'
        width={300}
        height={200}
        className='mx-auto'
      />
      <h2 className=' text-center text-4xl text-white'>Visitá nuestro local</h2>
      <div className='flex flex-row flex-wrap justify-around'>
        <Image
          src={imagenLocal1}
          width={150}
          height={150}
          alt='imagen_local'
          className='hover:scale-125 w-1/3 overflow-hidden m-2'
        />
        <Image
          src={imagenLocal2}
          width={150}
          height={150}
          alt='imagen_local'
          className='hover:scale-125 w-1/3 overflow-hidden m-2'
        />
        <Image
          src={imagenLocal3}
          width={300}
          height={150}
          alt='imagen_local'
          className='hover:scale-x-110 w-[346px] overflow-hidden m-2'
        />
      </div>
      <h2 className=' text-center text-2xl text-white'>Calle 123, City Bell</h2>
      <Image
        src={map}
        alt='map'
        width={300}
        height={300}
        className='mx-auto'
      />
      <h2 className='text-center text-2xl text-white'>Seguinos en nuestras redes</h2>
      <div className='flex flex-row justify-around gap-10 mx-28 mb-4'>
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
    </main>
  );
}
