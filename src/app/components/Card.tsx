'use client';

import Image from 'next/image';
// import image from '../../../public/Moscatel.max-1600x900.png';
import { useRouter } from 'next/navigation';

export default function Card(data: any) {
  const {
    name,
    cellar,
    image,
    barrel,
    region,
    reserve,
    varietal,
    id
  } = data.data

  const router = useRouter();

  function getGradient(varietal: string[]) {
    let tinto = false
    let blanco = false
    let rosado = false

    for (const item of varietal) {
      if (
        item === 'Malbec' || /\bMalbec\b/.test(item) ||
        item === 'Carmenere' || /\bCarmenere\b/.test(item) ||
        item === 'Merlot' || /\bMerlot\b/.test(item) ||
        item === 'Cabernet' || /\bCabernet\b/.test(item) ||
        item === 'Syrah' || /\bSyrah\b/.test(item) ||
        item === 'Tempranillo' || /\bTempranillo\b/.test(item) ||
        item === 'Sangiovese' || /\bSangiovese\b/.test(item) ||
        item === 'Tannat' || /\bTannat\b/.test(item) ||
        item === 'Tinto' || /\bTinto\b/.test(item) ||
        item === 'Noir' || /\bNoir\b/.test(item) ||
        item === 'Bonarda' || /\bBonarda\b/.test(item)
      ) {
        tinto = true;
        break;
      }
    }

    for (const item of varietal) {
      if (
        item === 'Chardonnay' || /\bChardonnay\b/.test(item) ||
        item === 'Chenin' || /\bChenin\b/.test(item) ||
        item === 'Blanc' || /\bBlanc\b/.test(item) ||
        item === 'Semillón' || /\bSemillón\b/.test(item) ||
        item === 'Viognier' || /\bViognier\b/.test(item) ||
        item === 'Torrontés' || /\bTorrontés\b/.test(item)
      ) {
        blanco = true;
        break;
      }
    }

    for (const item of varietal) {
      if (
        item === 'Malbec Rosé' || /\bRose\b/.test(item) ||
        item === 'Rosado' || /\bRosado\b/.test(item)
      ) {
        rosado = true;
        break;
      }
    }

    if (tinto && !blanco && !rosado) { return 'from-[#18010e]' }
    if (!tinto && blanco && !rosado) { return 'from-[#60541366]' }
    if (!tinto && !blanco && rosado) { return 'from-[#d7315666]' }

    if (tinto && blanco && !rosado) { return 'from-[#18010e] to-[#60541366]' }
    if (tinto && !blanco && rosado) { return 'from-[#18010e] to-[#d7315666]' }
    if (!tinto && blanco && rosado) { return 'from-[#60541366] to-[#d7315666]' }

    if (tinto && blanco && rosado) { return 'from-[#18010e] via-[#60541366] to-[#d7315666]' }

  }

  return (
    <div
      className={`relative
      bg-gradient-to-br ${getGradient(varietal)} bg-opacity-30
       text-white border border-gray-700 shadow-lg rounded-xl overflow-hidden flex flex-col items-center hover:shadow-xl cursor-pointer max-xl:mx-auto max-xl:w-[300px] xl:w-1/4 sm:w-5/12 p-2  hover:scale-110 hover:shadow-black`}
      onClick={() => router.push(`/products/${id}`)}
    >
      <div className="w-[300px] max-sm:w-[400px] flex flex-row justify-center p-2">
        <div className="relative w-60 h-80 max-sm:w-[200px] max-sm:h-[300px] ">
          <Image
            src={image}
            alt="imagen"
            layout="fill"
            objectFit="cover"
            className="rounded-xl rounded-bl-xl"
          />
        </div>
      </div>
      <div className="flex flex-col justify-around items-center p-2 xl:p-6 max-xl:justify-evenly">
        <h3 className="text-lg xl:text-4xl font-bold">{name}</h3>
        <div className="bg-[#AF3935] rounded-full w-2 h-2 xl:w-3 xl:h-3 m-4" />
        <p className="text-base xl:text-xl font-semibold ">{cellar}</p>
        <p className="text-xs xl:text-base font-semibold ">{varietal.join(', ')}</p>
      </div>
    </div>
  );
}
