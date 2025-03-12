'use client'

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { varietals } from "../../../context/varietals";

export default function AddProduct() {
   const [name, setName] = useState("");
   const [cellar, setCellar] = useState("");
   const [region, setRegion] = useState("");
   const [reserve, setReserve] = useState("");
   const [barrel, setBarrel] = useState("0");
   const [milliliters, setMilliliters] = useState("750");
   const [organic, setOrganic] = useState(false);
   const [selectedVarietals, setSelectedVarietals] = useState<string[]>([]);
   const [image, setImage] = useState("");
   const [imageURL, setImageURL] = useState('')
   const [file, setFile] = useState(null);
   const [filename, setFilename] = useState("");
   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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

   const handleChangeImage = async (event: any) => {
      const allowedExtensions = /(\.png|\.jpeg|\.jpg|\.heic)$/i;
      const selectedFile = event.target.files[0];

      if (!selectedFile || !allowedExtensions.exec(selectedFile.name)) {
         alert("Invalid file format. Please select a .png, .jpg or .jpeg file.");
         event.target.value = "";
      } else {
         setFile(selectedFile);
         setFilename(selectedFile.name);
         const formData = new FormData();
         formData.append("image", selectedFile);
         const response = await axios.post("https://api.imgbb.com/1/upload", formData, {
            headers: {
               "Content-Type": "multipart/form-data",
            },
            params: {
               key: process.env.NEXT_PUBLIC_IMGBB,
            },
         });

         if (response.data && response.data.data) {
            const photoUrl = response.data.data.url;
            setImageURL(photoUrl)
            setFile(null);
            setFilename("");
            console.log('imagen agregada correctamente:', photoUrl)
         }
      }
   };

   const handleSubmit = async () => {
      try {
         const newProduct = {
            name,
            cellar,
            region,
            reserve,
            barrel: barrel === '0' ? '' : barrel + ' meses',
            milliliters: Number(milliliters),
            organic,
            varietal: selectedVarietals,
            image: imageURL
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
         {process.env.NEXT_PUBLIC_DEVELOP ?
            <>
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
                        type="number"
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
                  <div className="flex flex-row cursor-pointer">
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
                           handleChangeImage(e)
                        }}
                     />
                  </label>
                  {filename && <p>{filename}</p>}
                  <button className="h-14" type="submit">Agregar Producto</button>
               </form>
            </>
            : null}
      </div>
   );
}
