'use client'

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddProduct() {
   const [name, setName] = useState("");
   const [cellar, setCellar] = useState("");
   const [region, setRegion] = useState("");
   const [reserve, setReserve] = useState("");
   const [barrel, setBarrel] = useState("");
   const [milliliters, setMilliliters] = useState("750");
   const [organic, setOrganic] = useState(false);
   const [selectedVarietals, setSelectedVarietals] = useState<string[]>([]);
   const [image, setImage] = useState("");
   const [file, setFile] = useState<File | null>(null);
   const [filename, setFilename] = useState("");
   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
   console.log(selectedVarietals)
   const router = useRouter()

   const handleDropdownToggle = () => {
      setIsDropdownOpen(prevState => !prevState);
   };

   const handleCheckboxChange = (value: string, checked: boolean) => {
      if (checked) {
         setSelectedVarietals(prevState => [...prevState, value]);
      } else {
         setSelectedVarietals(prevState => prevState.filter(option => option !== value));
      }
   };

   const varietals = [
      'Blanc de Malbecs',
      'Blend',
      'Blend de Blancas',
      'Cabernet',
      'Cabernet Franc',
      'Cabernet Sauvignon',
      'Chardonay',
      'Corte Tinto',
      'Gran Assemblage',
      'Gran Corte',
      'Malbec',
      'Malbec Rosé',
      'Merlot',
      'Petit Verdot',
      'Pinot Noir',
      'Red Blend',
      'Rosado Blend',
      'Sauvignon Blanc',
      'Semillón',
      'Syrah',
      'Tannat',
      'Tinto de Corte',
      'Torrontés Tardío',
      'Viognier',
      'Viognier Dulce',
   ]

   const handleSubmit = async () => {
      try {
         const newProduct = {
            name,
            cellar,
            region,
            reserve,
            barrel,
            milliliters: Number(milliliters),
            organic,
            varietal: selectedVarietals,
            image
         };

         await axios.post("/api/products", newProduct);
         console.log("Producto agregado:", newProduct);

         setName("");
         setCellar("");
         setRegion("");
         setReserve("");
         setBarrel("");
         setMilliliters("750");
         setOrganic(false);
         setSelectedVarietals([]);
         setImage("");
         setFile(null);
         setFilename("");
      } catch (error) {
         console.error("Error al agregar el nuevo producto:", error);
      }
   };

   return (
      <div className="flex flex-col items-center text-white gap-2 p-2">
         <button
            className="text-white border border-white p-2"
            onClick={() => router.push('/products')}
         >
            Volver
         </button>
         <form onSubmit={handleSubmit} className="flex flex-col gap-1">
            <label>
               Nombre:
               <input
                  className='text-black'
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
               />
            </label>
            <label>
               Bodega:
               <input
                  className='text-black'
                  type="text"
                  value={cellar}
                  onChange={(e) => setCellar(e.target.value)}
               />
            </label>
            <label>
               Región:
               <input
                  className='text-black'
                  type="text"
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
               />
            </label>
            <label>
               Reserva:
               <input
                  className='text-black'
                  type="text"
                  value={reserve}
                  onChange={(e) => setReserve(e.target.value)}
               />
            </label>
            <label>
               Tiempo de Barrica
               <input
                  className='text-black'
                  type="text"
                  value={barrel}
                  onChange={(e) => setBarrel(e.target.value)}
               />
            </label>
            <label>
               Mililitros:
               <input
                  className='text-black'
                  type="number"
                  value={milliliters}
                  onChange={(e) => setMilliliters(e.target.value)}
               />
            </label>
            <label>
               Orgánico:
               <input
                  type="checkbox"
                  checked={organic}
                  onChange={(e) => setOrganic(e.target.checked)}
               />
            </label>
            <div className="flex flex-row">
               <p onClick={handleDropdownToggle}>
                  {isDropdownOpen === true ? 'Ocultar' : 'Mostrar Varietales'}
               </p>
               {isDropdownOpen && (
                  <div className="flex flex-col">
                     {varietals.map(varietal => (
                        <label key={varietal}>
                           <input
                              type="checkbox"
                              value={varietal}
                              checked={selectedVarietals.some(option => option === varietal)}
                              onChange={(e) => handleCheckboxChange(varietal, e.target.checked)}
                           />
                           {varietal}
                        </label>
                     ))}
                  </div>
               )}
            </div>
            <label>
               Imagen:
               <input
                  type="file"
                  onChange={(e) => {
                     const file = e.target.files && e.target.files[0];
                     if (file) {
                        setFile(file);
                        setFilename(file.name);
                     }
                  }}
               />
            </label>
            {filename && <p>{filename}</p>}
            <button className="h-14" type="submit">Agregar Producto</button>
         </form>
      </div>
   );
}
