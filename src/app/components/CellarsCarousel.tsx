'use client';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';
import imagen1 from '../../../public/bodega.png';
import { Wine } from '../../../context/store';

interface CellarsCarouselProps {
  cellars: Wine[];
}

const CellarsCarousel: React.FC<CellarsCarouselProps> = ({ cellars }) => {

  const data = cellars.slice(0, 15);

  const images = [
    { src: imagen1, alt: 'imagen' },
    { src: imagen1, alt: 'imagen' },
    { src: imagen1, alt: 'imagen' },
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 4000,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
  };

  return (
    <section className="max-container flex w-full items-center justify-between text-justify max-xl:flex-col xl:p-4">
      <div className="max-container flex w-full items-center justify-between gap-10 text-justify max-xl:flex-col-reverse">
        <Slider {...settings} className="flex w-2/3 flex-row mx-auto xl:w-2/3 ">
          {data.map((cellar, index) => (
            <div key={index} className="">
              <div className="flex w-full flex-col flex-1 flex-wrap items-center justify-center max-xl:mt-2 bg-gray-900 bg-opacity-100 border-2 border-gray-700 border-opacity-80 p-4">
                <p className="font-quattro italic text-sm xl:text-6xl text-white mb-4">
                  {cellar.cellar}
                </p>
                <Image
                  src={cellar.image}
                  alt={cellar.name}
                  width={400}
                  height={300}
                  className="rounded-2xl hover:shadow-3xl shadow-white"
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
