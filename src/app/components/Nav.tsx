'use client';

import { IoMenu } from 'react-icons/io5';
import logo from '../../../public/logo.png';
import Image from 'next/image';
import { useState } from 'react';
import { RxCross1 } from 'react-icons/rx';
import { IoIosWine } from 'react-icons/io';
import { useRouter, usePathname } from 'next/navigation';
import { useGlobalContext } from '../../../context/store';
import Link from 'next/link';

export default function Nav() {
  const router = useRouter();
  const pathname = usePathname()

  const [toggle, setToggle] = useState<boolean>(false);

  const itemsNav = [
    { title: 'Tintos' },
    { title: 'Blancos' },
    { title: 'Rosados' },
    { title: 'Naranjos' },
    { title: 'Espumantes' },
    { title: 'Otras bebidas' },
    { title: 'Accesorios' },
  ];

  const { setSelectedVarietal } = useGlobalContext()

  return (
    <>
      <div className="flex flex-col fixed top-0 w-full z-30">
        <div className=" bg-[#AF3935] flex flex-row justify-between xl:justify-around items-center p-4">
          <div className="ml-2 w-16 h-16">
            <Image
              src={logo}
              alt="logo"
              width={48}
              height={48}
              className=" w-full h-full hover:cursor-pointer bg-white"
              onClick={() => router.push('/')}
            />
          </div>
          <div className=" w-16 h-16 xl:hidden" hidden={toggle}>
            <IoMenu
              className=" w-full h-full hover:cursor-pointer"
              onClick={() => setToggle((toggle) => !toggle)}
            />
          </div>
          <div className="w-16 h-16 xl:hidden" hidden={!toggle}>
            <RxCross1
              className="w-full h-full"
              onClick={() => setToggle((toggle) => !toggle)}
            />
          </div>
          {itemsNav.map((item) => (
            <Link href="/products" key={item.title} className='max-xl:hidden'>
              <div
                className="flex flex-row items-center p-1 gap-2 pl-2 max-xl:hidden text-white hover:bg-white hover:text-[#AF3935] hover:font-bold"
                onClick={() => {
                  setSelectedVarietal(item.title);
                  setToggle((toggle) => !toggle)
                  pathname !== '/products' ? router.push('/products') : null;
                }}
                key={item.title}
              >
                <IoIosWine className='text-black' />
                <p className="text-[22px]">{item.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      {toggle ? (
        <div className="bg-[#903431] xl:hidden  fixed top-24 w-full z-30">
          {itemsNav.map((item) => (
            <Link href="/products" key={item.title}>
              <div
                className="flex flex-row items-center p-1 gap-2 pl-2"
                onClick={() => {
                  setSelectedVarietal(item.title);
                  setToggle((toggle) => !toggle)
                  pathname !== '/products' ? router.push('/products') : null;
                }}
                key={item.title}
              >
                <IoIosWine />
                <p className="text-xl cursor-pointer">{item.title}</p>
              </div>
            </Link>
          ))}
        </div >
      ) : null
      }
    </>
  );
}
