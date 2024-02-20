'use client'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';
import imagen1 from '../../../public/bodega.png';

function CellarsCarousel() {
   const images = [
      { src: imagen1, alt: 'imagen' },
      { src: imagen1, alt: 'imagen' },
      { src: imagen1, alt: 'imagen' },
   ];

   const settings = {
      dots: false,
      infinite: true,
      speed: 2000,
      slidesToShow: 2,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 500,
   };

   return (
      <section className='max-container flex w-full items-center justify-between text-justify max-xl:flex-col xl:p-4'>
         <div className='max-container flex w-full items-center justify-between gap-10 text-justify max-xl:flex-col-reverse'>
            <Slider {...settings} className='flex w-2/3 flex-row mx-auto xl:w-2/3'>
               {images.map((image, index) => (
                  <div key={index} className=''>
                     <div className='flex w-full flex-col flex-1 flex-wrap items-center justify-center max-xl:mt-2 bg-white bg-opacity-30 border-solid border-[#325481] border-8 border-opacity-80'>
                        <p className='font-quattro italic text-sm xl:text-6xl'>Bodega</p>
                        <Image
                           src={image.src}
                           alt={image.alt}
                           width={400}
                           height={300}
                           className='max-h-full rounded-2xl hover:shadow-3xl shadow-white'
                        />
                     </div>
                  </div>
               ))}
            </Slider>
         </div>
      </section>
   );
}

export default CellarsCarousel;
