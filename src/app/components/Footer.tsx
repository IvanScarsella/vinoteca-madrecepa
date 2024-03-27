'use client';

import Image from 'next/image';
import logo from '../../../public/logo.png';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useGlobalContext } from '../../../context/store';

export default function Nav() {
  const router = useRouter();
  const pathname = usePathname()

  const itemsNav = [
    { title: 'Tintos' },
    { title: 'Blancos' },
    { title: 'Rosados' },
    { title: 'Espumantes' },
    { title: 'Otras bebidas' },
    { title: 'Accesorios' },
  ];

  const { setSelectedVarietal } = useGlobalContext()

  return (
    <div className="bg-[#AF3935] h-full">
      <div className="flex flex-row justify-center items-center p-4">
        <div className="w-1/3 min-w-24 p-2 flex justify-center items-center">
          <Image
            src={logo}
            alt="logo"
            width={144}
            height={144}
            className='bg-white'
          />
        </div>
        <div className="md:p-4 flex flex-row justify-center items-center mx-auto">
          <div className="w-full flex flex-col md:flex-row xl:justify-around  xl:gap-8  ">
            {itemsNav.map((item) => (
              <div
                className="flex flex-row p-1 gap-2 px-auto"
                key={item.title}
              >
                {/* <IoIosWine /> */}
                <p
                  className="text-sm md:text-base lg:text-xl text-white cursor-pointer"
                  onClick={() => {
                    setSelectedVarietal(item.title);
                    pathname !== '/products' ? router.push('/products') : null;
                  }}
                >
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="w-1/3 p-4 text-base max-sm:text-xs flex flex-col justify-center gap-2 xl:mx-auto md:pl-32">
          <p>Teléfonos:</p>
          <p>221-4942853</p>
          <p>0221-4723895</p>
          {/* <Link href="mailto:vinoteca.madrecepa@gmail.com" target="_blank">
            <p>vinoteca.madrecepa@gmail.com</p>
          </Link> */}
          <p>Calle 472 esquina 13b</p>
          <p>City Bell</p>
        </div>
      </div>
      <div className="flex flex-row justify-center p-4 text-white">
        <Link href="mailto:scarsellaivan@gmail.com" target="_blank">
          <p>Desarrollado por Iván Scarsella</p>
        </Link>
      </div>
    </div>
  );
}
