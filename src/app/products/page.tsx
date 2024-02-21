export default function Products() {

   const strainFilters = [
      'Cepa 1',
      'Cepa 2',
      'Cepa 3'
   ]

   const cellarFilters = [
      'Cellar 1',
      'Cellar 2',
      'Cellar 3',
   ]

   const regionFilters = [
      'Region 1',
      'Region 2',
      'Region 3',
   ]

   const reserveFilters = [
      'Reserva 1',
      'Reserva 2',
      'Reserva 3',
   ]
   return (
      <main className="p-8 pt-10 h-full">
         <div className="flex flex-col justify-around text-white h-[400]">
            <div>
               {/* <h3 className="text-lg ">Filtros</h3> */}
               <div className="flex flex-col">
                  <div className="relative">
                     <div className="absolute z-[0] top-0 left-0 h-full w-full bg-center bg-no-repeat opacity-30"
                        style={{
                           backgroundImage:
                              'url("https://blog.winesofargentina.com/wp-content/uploads/2021/06/Radiografia-tintas-1024x681.jpg")',
                           backgroundSize: '100% 100%' // Ajusta la imagen al tamaño del contenedor
                        }} />
                     <div className="flex flex-col items-center">
                        <h4 className="text-2xl ">Cepa</h4>
                        {strainFilters.map(strain => (
                           <p className="text-base ">{strain}</p>
                        ))}
                     </div>
                  </div>
                  <div className="relative">
                     <div className="absolute z-[0] top-0 left-0 h-full w-full bg-center bg-no-repeat opacity-30"
                        style={{
                           backgroundImage:
                              'url("https://www.civitatis.com/blog/wp-content/uploads/2016/09/bodega-chianti.jpg")',
                           backgroundSize: '100% 100%' // Ajusta la imagen al tamaño del contenedor
                        }} />
                     <div className="flex flex-col items-center">
                        <h4 className="text-2xl ">Bodega</h4>
                        {cellarFilters.map(cellar => (
                           <p className="text-base ">{cellar}</p>
                        ))}
                     </div>
                  </div>
                  <div className="relative">
                     <div className="absolute z-[0] top-0 left-0 h-full w-full bg-center bg-no-repeat opacity-30"
                        style={{
                           backgroundImage:
                              'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREPl-e6Tk2PkpHC08lHlxVLLf-PHtkCkv6gA&usqp=CAU")',
                           backgroundSize: '100% 100%' // Ajusta la imagen al tamaño del contenedor
                        }} />
                     <div className="flex flex-col items-center">
                        <h4 className="text-2xl ">Región</h4>
                        {regionFilters.map(region => (
                           <p className="text-base ">{region}</p>
                        ))}
                     </div>
                  </div>
                  <div className="relative">
                     <div className="absolute z-[0] top-0 left-0 h-full w-full bg-center bg-no-repeat opacity-30"
                        style={{
                           backgroundImage:
                              'url("https://c8.alamy.com/compes/2af83mx/francia-borgona-2019-06-19-tienda-joseph-drouhin-en-bodega-bastidor-de-madera-con-el-famoso-vino-tinto-pinot-noir-concepto-frances-la-produccion-de-vinos-organicos-degust-2af83mx.jpg")',
                           backgroundSize: '100% 100%' // Ajusta la imagen al tamaño del contenedor
                        }} />
                     <div className="flex flex-col items-center">
                        <h4 className="text-2xl ">Reserva</h4>
                        {regionFilters.map(reserve => (
                           <p className="text-base ">{reserve}</p>
                        ))}
                     </div>
                  </div>
               </div>

            </div>
            <div className="bg-[#753945] w-24 h-1 my-auto self-center" />
            <div className="flex flex-col items-center">
               <h3 className="text-2xl">Orden</h3>
               <p className="text-base">A-Z</p>
            </div>
         </div>
      </main>
   )
}
