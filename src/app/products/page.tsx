'use client';

import { useEffect, useState } from 'react';
import Card from '../components/Card';
import { MdOutlineSearch } from 'react-icons/md';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Product, useGlobalContext } from '../../../context/store';

export default function Products() {

   const router = useRouter()
   const [page, setPage] = useState(1);

   const strainFilters = ['Tinto', 'Blanco', 'Rosado', 'Espumante'];

   const cellarFilters = ['Cellar 1', 'Cellar 2', 'Cellar 3'];

   const regionFilters = ['Region 1', 'Region 2', 'Region 3'];

   const reserveFilters = ['Reserva 1', 'Reserva 2', 'Reserva 3'];

   const productsOrder = ['A-Z', 'Z-A'];

   const {
      products,
      setProducts,
      selectedVarietal,
      setSelectedVarietal,
      selectedCellar,
      setSelectedCellar,
      selectedReserve,
      setSelectedReserve,
      selectedRegion,
      setSelectedRegion,
      orderBy,
      setOrderBy,
   } = useGlobalContext()

   const handleChangePage = (newPage: any) => {
      setPage(newPage);
   };

   const cardsPerPage = 15;
   const startIndex = (page - 1) * cardsPerPage;
   const endIndex = startIndex + cardsPerPage;
   const displayedCards = products.slice(startIndex, endIndex);

   return (
      <main className="p-8 px-24 max-xl:px-8 pt-10 h-full flex flex-col gap-4">
         {process.env.NEXT_PUBLIC_DEVELOP ?
            <>
               <button
                  className='text-white'
                  onClick={() => router.push('/editData')}
               >
                  Editar
               </button>
               <button
                  className='text-white'
                  onClick={() => router.push('/addProduct')}
               >
                  Agregar Nuevo
               </button>
            </>
            : null}
         <div className="flex flex-col xl:flex-col justify-around text-white h-[400]">
            <div className="flex flex-row xl:flex-row flex-wrap xl:flex-nowrap">
               <div className="relative w-1/2">
                  <div
                     className="absolute z-0 top-0 left-0 h-full w-full bg-center bg-no-repeat opacity-60"
                     style={{
                        backgroundImage:
                           'url("https://blog.winesofargentina.com/wp-content/uploads/2021/06/Radiografia-tintas-1024x681.jpg")',
                        backgroundSize: '100% 100%',
                     }}
                  />

                  <div className="relative z-10 flex flex-col items-center h-full border-2 border-gray-400 border-opacity-40 p-4 rounded-md">
                     <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-l from-gray-200 to-transparent opacity-20 rounded-md" />
                     <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tl from-white to-transparent opacity-20 rounded-t-md" />

                     <h4 className="text-4xl text-white font-bold mb-4 bg-black bg-opacity-20">
                        Tipo
                     </h4>
                     {strainFilters.map((strain, index) => (
                        <p
                           key={index}
                           className=" z-0 text-xl text-white font-bold bg-black bg-opacity-20 cursor-pointer"
                           onClick={selectedVarietal === selectedVarietal ? () => setSelectedVarietal('') : () => setSelectedVarietal(selectedVarietal)}
                        >
                           {strain}
                        </p>
                     ))}
                  </div>
               </div>



               <div className="relative w-1/2">
                  <div
                     className="absolute z-0 top-0 left-0 h-full w-full bg-center bg-no-repeat opacity-60"
                     style={{
                        backgroundImage:
                           'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREPl-e6Tk2PkpHC08lHlxVLLf-PHtkCkv6gA&usqp=CAU")',
                        backgroundSize: '100% 100%',
                     }}
                  />
                  <div className="relative z-10 flex flex-col items-center h-full border-2 border-gray-400 border-opacity-40 p-4 rounded-md">
                     <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-l from-gray-200 to-transparent opacity-20 rounded-md" />
                     <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tl from-white to-transparent opacity-20 rounded-t-md" />
                     <h4 className="text-4xl text-white font-bold mb-4 bg-black bg-opacity-20">
                        Región
                     </h4>
                     {regionFilters.map((region, index) => (
                        <p
                           key={index}
                           className="cursor-pointer z-0 text-xl text-white font-bold bg-black bg-opacity-20"
                           onClick={selectedRegion === region ? () => setSelectedRegion('') : () => setSelectedRegion(region)}
                        >
                           {region}
                        </p>
                     ))}
                  </div>
               </div>

               <div className="relative w-1/2">
                  <div
                     className="absolute z-0 top-0 left-0 h-full w-full bg-center bg-no-repeat opacity-60"
                     style={{
                        backgroundImage:
                           'url("https://c8.alamy.com/compes/2af83mx/francia-borgona-2019-06-19-tienda-joseph-drouhin-en-bodega-bastidor-de-madera-con-el-famoso-vino-tinto-pinot-noir-concepto-frances-la-produccion-de-vinos-organicos-degust-2af83mx.jpg")',
                        backgroundSize: '100% 100%',
                     }}
                  />
                  <div className="relative z-10 flex flex-col items-center h-full border-2 border-gray-400 border-opacity-40 p-4 rounded-md">
                     <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-l from-gray-200 to-transparent opacity-20 rounded-md" />
                     <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tl from-white to-transparent opacity-20 rounded-t-md" />
                     <h4 className="text-4xl text-white font-bold mb-4 bg-black bg-opacity-20">
                        Reserva
                     </h4>
                     {reserveFilters.map((reserve, index) => (
                        <p
                           key={index}
                           className="cursor-pointer z-0 text-xl text-white font-bold bg-black bg-opacity-20"
                           onClick={selectedReserve === reserve ? () => setSelectedReserve('') : () => setSelectedReserve(reserve)}
                        >
                           {reserve}
                        </p>
                     ))}
                  </div>
               </div>
               <div className="relative w-1/2">
                  <div
                     className="absolute z-0 top-0 left-0 h-full w-full bg-center bg-no-repeat opacity-60"
                     style={{
                        backgroundImage:
                           'url("https://esenciawines.com/WebRoot/Store/Shops/EsenciaWines/MediaGallery/Blog/copa_de_vino.jpg")',
                        backgroundSize: '100% 100%',
                     }}
                  />
                  <div className="relative z-10 flex flex-col items-center h-full border-2 border-gray-400 border-opacity-40 p-4 rounded-md">
                     <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-l from-gray-200 to-transparent opacity-20 rounded-md" />
                     <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tl from-white to-transparent opacity-20 rounded-t-md" />
                     <h4 className="text-4xl text-white font-bold mb-4 bg-black bg-opacity-20">
                        Orden
                     </h4>
                     {productsOrder.map((order, index) => (
                        <p
                           key={index}
                           className="cursor-pointer z-0 text-xl text-white font-bold bg-black bg-opacity-20"
                           onClick={orderBy === order ? () => setOrderBy('') : () => setOrderBy(order)}
                        >
                           {order}
                        </p>
                     ))}
                  </div>
               </div>
               <div className="relative w-1/2 max-xl:w-full">
                  <div
                     className="absolute z-0 top-0 left-0 h-full w-full bg-center bg-no-repeat opacity-60"
                     style={{
                        backgroundImage:
                           'url("https://www.civitatis.com/blog/wp-content/uploads/2016/09/bodega-chianti.jpg")',
                        backgroundSize: '100% 100%',
                     }}
                  />
                  <div className="relative z-10 flex flex-col items-center h-full border-2 border-gray-400 border-opacity-40 p-4 rounded-md">
                     <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-l from-gray-200 to-transparent opacity-20 rounded-md" />
                     <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tl from-white to-transparent opacity-20 rounded-t-md" />
                     <h4 className="text-4xl text-white font-bold mb-4 bg-black bg-opacity-20">
                        Bodega
                     </h4>
                     {cellarFilters.map((cellar, index) => (
                        <p
                           key={index}
                           className="cursor-pointer z-0 text-xl text-white font-bold bg-black bg-opacity-20"
                           onClick={selectedCellar === cellar ? () => setSelectedCellar('') : () => setSelectedCellar(cellar)}
                        >
                           {cellar}
                        </p>
                     ))}
                  </div>
               </div>
            </div>
            {/* <div className="bg-[#753945] w-24 xl:w-1 h-1 xl:h-24 my-auto self-center" /> */}
         </div>
         <div className=" w-full h-6 text-center flex flex-row mb-4 p-1 xl:w-2/5 self-center">
            <MdOutlineSearch className="bg-white h-8 w-10 flex flex-row items-center" />
            <input type="text" placeholder="Buscar" className="w-full h-8" />
         </div>
         <div className="flex justify-center mt-4">
            <button
               onClick={() => handleChangePage(page - 1)}
               disabled={page === 1}
               className="bg-gray-700 hover:bg-gray-800 text-white font-medium py-2 px-4 rounded-l"
            >
               Anterior
            </button>
            <div className="p-2 text-white">{`Página ${page} / ${Math.ceil(products.length / cardsPerPage)}`}</div>
            <button
               onClick={() => handleChangePage(page + 1)}
               disabled={page === Math.ceil(products.length / cardsPerPage)}
               className="bg-gray-700 hover:bg-gray-800 text-white font-medium py-2 px-4 rounded-r"
            >
               Siguiente
            </button>
         </div>
         <div className="flex flex-col gap-4 flex-wrap sm:flex-row justify-evenly">
            {displayedCards.map((card, index) => (
               <Card key={index} data={card} />
            ))}
         </div>
         <div className="flex justify-center mt-4">
            <button
               onClick={() => handleChangePage(page - 1)}
               disabled={page === 1}
               className="bg-gray-700 hover:bg-gray-800 text-white font-medium py-2 px-4 rounded-l"
            >
               Anterior
            </button>
            <div className="p-2 text-white">{`Página ${page} / ${Math.ceil(products.length / cardsPerPage)}`}</div>
            <button
               onClick={() => handleChangePage(page + 1)}
               disabled={page === Math.ceil(products.length / cardsPerPage)}
               className="bg-gray-700 hover:bg-gray-800 text-white font-medium py-2 px-4 rounded-r"
            >
               Siguiente
            </button>
         </div>
      </main>
   );
}
