'use client';

import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Image from 'next/image';
import imagen1 from '../../../public/imagen_carrusel_1.jpg';
import imagen2 from '../../../public/imagen_carrusel_2.jpg';
import imagen3 from '../../../public/imagen_carrusel_3.jpg';
import imagen4 from '../../../public/imagen_carrusel_4.jpg';
import imagen5 from '../../../public/imagen_carrusel_5.jpg';
import imagen6 from '../../../public/imagen_carrusel_6.jpg';

function PhotosCarousel() {
  const images = [
    { src: imagen1, alt: 'imagen' },
    { src: imagen2, alt: 'imagen' },
    { src: imagen3, alt: 'imagen' },
    { src: imagen4, alt: 'imagen' },
    { src: imagen5, alt: 'imagen' },
    { src: imagen6, alt: 'imagen' },
  ];

  return (
    <section className="max-container flex w-full items-center justify-between text-justify max-xl:flex-col xl:p-8 mx-auto">
      <div className="max-container flex w-full items-center justify-between gap-10 text-justify max-xl:flex-col-reverse">
        <Carousel
          {...settings}
          className=" flex w-3/4 flex-row mx-auto
        xl:w-2/5
        "
        >
          {images.map((image, index) => (
            <div
              key={index}
              className="flex w-full flex-1 flex-wrap items-center justify-center max-xl:mt-2 min-w-[100px]"
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={4000}
                height={3000}
                className="max-h-full hover:shadow-3xl shadow-white min-h-[200px] min-w-[100px]"
              />
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
}

const settings = {
  infiniteLoop: true,
  autoPlay: true,
  showThumbs: false,
  interval: 5000,
  // showArrows: false,
  showStatus: false,
  showIndicators: false,
  stopOnHover: true,
};

export default PhotosCarousel;
