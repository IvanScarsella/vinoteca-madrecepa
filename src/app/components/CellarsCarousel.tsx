'use client'

import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import Image from 'next/image'
import imagen1 from '../../../public/bodega.png'

function CellarsCarousel() {
   const images = [
      { src: imagen1, alt: 'imagen' },
      { src: imagen1, alt: 'imagen' },
      { src: imagen1, alt: 'imagen' },
   ]

   return (
      <section className='max-container flex w-full items-center justify-between text-justify  max-xl:flex-col xl:p-4'>
         <div className='max-container flex w-full items-center justify-between gap-10 text-justify max-xl:flex-col-reverse'>
            <Carousel
               {...settings}
               className=' flex w-1/2 flex-row
        max-xl:m-1  max-xl:justify-center max-lg:w-2/3
        '
            >
               {images.map((image, index) => (
                  <div
                     key={index}
                     className='flex w-full flex-1 flex-wrap items-center justify-center max-xl:mt-2 bg-white bg-opacity-30  border-solid border-[#325481] border-8 border-opacity-80'
                  >
                     <p className='font-quattro italic text-4xl'>Bodega</p>
                     <Image
                        src={image.src}
                        alt={image.alt}
                        width={400}
                        height={300}
                        className='max-h-full rounded-2xl  hover:shadow-3xl shadow-white '
                     />
                  </div>
               ))}
            </Carousel>
         </div>
      </section>
   )
}

const settings = {
   infiniteLoop: true,
   autoPlay: true,
   showThumbs: false,
   interval: 5000,
   // showArrows: false,
   showStatus: false,
   // showIndicators: false,
   stopOnHover: true,
}

export default CellarsCarousel
