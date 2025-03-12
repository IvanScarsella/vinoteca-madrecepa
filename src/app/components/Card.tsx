'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Loader from './Loader';
import { redVarietals, whiteVarietals, pinkVarietals, orangeVarietals } from '../../../context/varietals';

export default function Card(data: any) {
  const {
    name,
    cellar,
    image,
    barrel,
    region,
    reserve,
    varietal,
    type,
    description,
    id
  } = data.data

  const router = useRouter();

  function getGradient(varietal: string[]) {
    if (!varietal) return 'from-[#101010] to-[#101010]'

    let tinto = false
    let blanco = false
    let rosado = false
    let naranjo = false

    for (const item of varietal) {
      if (
        redVarietals.toLocaleString().includes(item)
      ) {
        tinto = true;
        break;
      }
    }

    for (const item of varietal) {
      if (
        whiteVarietals.toLocaleString().includes(item)
      ) {
        blanco = true;
        break;
      }
    }

    for (const item of varietal) {
      if (
        pinkVarietals.toLocaleString().includes(item)
      ) {
        rosado = true;
        break;
      }
    }

    for (const item of varietal) {
      if (
        orangeVarietals.toLocaleString().includes(item)
      ) {
        naranjo = true;
        break;
      }
    }

    if (tinto && !blanco && !rosado && !naranjo) { return 'from-[#18010e] to-[#18010e]' }
    if (!tinto && blanco && !rosado && !naranjo) { return 'from-[#60541366] to-[#60541366]' }
    if (!tinto && !blanco && rosado && !naranjo) { return 'from-[#d7315666] to-[#d7315666]' }
    if (!tinto && !blanco && !rosado && naranjo) { return 'from-[#eb8034] to-[#eb8034]' }

    if (tinto && blanco && !rosado && !naranjo) { return 'from-[#18010e] to-[#60541366]' }
    if (tinto && !blanco && rosado && !naranjo) { return 'from-[#18010e] to-[#d7315666]' }
    if (tinto && !blanco && !rosado && naranjo) { return 'from-[#18010e] to-[#eb803466]' }
    if (!tinto && blanco && rosado && !naranjo) { return 'from-[#60541366] to-[#d7315666]' }
    if (!tinto && blanco && !rosado && naranjo) { return 'from-[#d7315666] to-[#eb803466]' }
    if (!tinto && !blanco && rosado && naranjo) { return 'from-[#60541366] to-[#eb803466]' }

    if (tinto && blanco && rosado && !naranjo) { return 'from-[#18010e] via-[#60541366] to-[#d7315666]' }
    if (tinto && blanco && !rosado && naranjo) { return 'from-[#18010e] via-[#60541366] to-[#eb803466]' }
    if (tinto && !blanco && rosado && naranjo) { return 'from-[#18010e] via-[#d7315666] to-[#eb803466]' }
    if (!tinto && blanco && rosado && naranjo) { return 'from-[#60541366] via-[#60541366] to-[#eb803466]' }

    if (tinto && blanco && rosado && rosado) { return 'from-[#18010e] via-[#60541366] via-[#d7315666] to-[#eb8034]' }

    if (!tinto && !blanco && !rosado && !naranjo) { return 'from-[#eb8034] via-[#d7315666] via-[#60541366] to-[#18010e]' }

  }

  return (
    <div
      className={`relative
      bg-gradient-to-br ${getGradient(varietal)} bg-opacity-30 z-20
       text-white border border-gray-700 shadow-lg rounded-xl overflow-hidden flex flex-col items-center hover:shadow-xl cursor-pointer max-xl:mx-auto max-xl:w-[300px] xl:w-1/4 sm:w-5/12 p-2  hover:scale-110 hover:shadow-black`}
      onClick={() => router.push(`/products/${id}`)}
    >
      <div className="w-[300px] max-sm:w-[400px] flex flex-row justify-center p-2">
        <div className="relative w-60 h-80 max-sm:w-[200px] max-sm:h-[300px] ">
          {image ?
            <Image
              src={image}
              width={828}
              height={1104}
              alt="imagen"
              // layout="fill"
              objectFit="cover"
              className="rounded-xl rounded-bl-xl"
            />
            : (<Loader />)}
        </div>
      </div>
      <div className="flex flex-col justify-around items-center p-2 xl:p-6 max-xl:justify-evenly">
        <h3 className="text-lg xl:text-4xl font-bold text-center">{name}</h3>
        {type || description || varietal ?
          <div className="bg-[#AF3935] rounded-full w-2 h-2 xl:w-3 xl:h-3 m-4" />
          : null}
        <p className="text-base xl:text-xl font-semibold ">{cellar}</p>
        {type || description || varietal ?
          <p className="text-xs xl:text-base font-semibold ">{type ? type : description ? description : varietal.join(', ')}</p>
          : null}
      </div>
    </div>
  );
}
