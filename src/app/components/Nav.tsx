'use client';

import { IoMenu } from 'react-icons/io5';
import logo from '../../../public/logo.jpg';
import Image from 'next/image';
import { useState } from 'react';
import { RxCross1 } from 'react-icons/rx';
import { IoIosWine } from 'react-icons/io';
import { useRouter } from 'next/navigation';

export default function Nav() {
  const router = useRouter();

  const [toggle, setToggle] = useState<boolean>(false);

  const itemsNav = [
    { title: 'Tintos' },
    { title: 'Blancos' },
    { title: 'Rosados' },
    { title: 'Espumantes' },
    { title: 'Aperitivos' },
  ];

  return (
    <>
      <div className="flex flex-col top-0 w-full z-20">
        <div className=" bg-[#AF3935] flex flex-row justify-between xl:justify-around items-center p-4">
          <div className="w-16 h-16">
            <Image
              src={logo}
              alt="logo"
              width={48}
              height={48}
              className="w-full h-full hover:cursor-pointer"
              onClick={() => router.push('/')}
            />
          </div>
          <div className="w-16 h-16 xl:hidden" hidden={toggle}>
            <IoMenu
              className="w-full h-full"
              onClick={() => setToggle((toggle) => !toggle)}
            />
          </div>
          <div className="w-16 h-16 xl:hidden" hidden={!toggle}>
            <RxCross1
              className="w-full h-full"
              onClick={() => setToggle((toggle) => !toggle)}
            />
          </div>
          {/* <div className="flex flex-row"> */}
          {itemsNav.map((item) => (
            <a href="/products" className="max-xl:hidden" key={item.title}>
              <div
                className="flex flex-row items-center p-1 gap-2 pl-2 max-xl:hidden"
                onClick={() => router.push('/products')}
              >
                <IoIosWine />
                <p className="text-2xl text-white">{item.title}</p>
              </div>
            </a>
          ))}
          {/* </div> */}
        </div>
      </div>
      {toggle ? (
        <div className="bg-[#903431]  w-full  xl:hidden ">
          {itemsNav.map((item) => (
            <div
              className="flex flex-row items-center p-1 gap-2 pl-2"
              onClick={() => router.push('/products')}
              key={item.title}
            >
              <IoIosWine />
              <p className="text-2xl cursor-pointer">{item.title}</p>
            </div>
          ))}
        </div>
      ) : null}
    </>
  );
}
