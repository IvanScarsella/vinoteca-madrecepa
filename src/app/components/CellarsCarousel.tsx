'use client';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';
import imagen1 from '../../../public/bodega.png';
import { Wine } from '../../../context/store';
import Loader from './Loader';
import { useRouter } from 'next/navigation';

interface CellarsCarouselProps {
  cellars: Wine[];
}

const CellarsCarousel: React.FC<CellarsCarouselProps> = ({ cellars }) => {

  const router = useRouter()

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
        {cellars ?
          <Slider {...settings} className="flex w-2/3 flex-row mx-auto xl:w-2/3 ">
            {data.map((cellar, index) => (
              <div key={index} className="cursor-pointer" onClick={() => router.push(`/products/${cellar.id}`)}>
                <div className="flex w-full gap-8 max-sm:gap-2 flex-col flex-1 flex-wrap items-center justify-center max-xl:mt-2 bg-[#1d1d1d] bg-opacity-100 p-4">
                  {cellar.image ? (
                    <Image
                      src={cellar.image}
                      alt={cellar.name}
                      width={400}
                      height={300}
                      className="rounded-2xl hover:shadow-3xl shadow-white"
                    />
                  ) : (
                    <Loader />
                  )}
                  <p className="font-quattro italic text-sm xl:text-6xl text-white">
                    {cellar.cellar}
                  </p>
                </div>
              </div>
            ))}
          </Slider>
          : (
            <Loader />
          )}
      </div>
    </section>
  );
}

export default CellarsCarousel;
