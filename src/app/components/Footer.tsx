'use client';

import Image from 'next/image';
import logo from '../../../public/logo.jpg';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Nav() {
  const router = useRouter();

  const itemsNav = [
    { title: 'Tintos' },
    { title: 'Blancos' },
    { title: 'Rosados' },
    { title: 'Espumantes' },
    { title: 'Aperitivos' },
  ];

  return (
    <div className="bg-[#AF3935] h-full">
      <div className="flex flex-row justify-center items-center p-4">
        <div className="w-1/3 p-4 flex justify-center">
          <Image
            src={logo}
            alt="logo"
            width={144}
            height={144}
            // className='h-20'
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
                  onClick={() => router.push('/products')}
                >
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="w-1/3 p-4 text-base flex flex-col justify-center gap-2 xl:items-center">
          <p>Teléfono:</p>
          <p>123456789</p>
          <Link href="mailto:mail@mail.com" target="_blank">
            <p>mail@mail.com</p>
          </Link>
          <p>Calle 123</p>
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
