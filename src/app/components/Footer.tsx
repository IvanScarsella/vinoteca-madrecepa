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
        <div className="w-1/3 p-4 flex justify-center">
          <Image
            src={logo}
            alt="logo"
            width={144}
            height={144}
            className='bg-white'
          />
        </div>
        <div className="w-1/3 p-4">
          <div className="w-full xl:flex xl:flex-row xl:justify-around xl:gap-8">
            {itemsNav.map((item) => (
              <div
                className="flex flex-row items-center justify-center p-1 gap-2 pl-2"
                key={item.title}
              >
                {/* <IoIosWine /> */}
                <p
                  className="text-base xl:text-2xl text-white cursor-pointer"
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
        <div className="w-1/3 p-4 text-base max-sm:text-xs flex flex-col justify-center gap-2 xl:items-center">
          <p>Teléfonos:</p>
          <p>221-4942853</p>
          <p>4723895</p>
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
