'use client'

import axios from "axios"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Wine } from "../../../context/store"

export default function EditData() {
   const [data, setData] = useState<Wine[]>([])
   const [editingProductId, setEditingProductId] = useState<string | null>(null)
   const [product, setProduct] = useState<Wine>()
   const [selectedVarietals, setSelectedVarietals] = useState<string[]>([]);
   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
   const [isOrganic, setIsOrganic] = useState(false)
   const [imageURL, setImageURL] = useState('')
   const [file, setFile] = useState(null);
   const [filename, setFilename] = useState('');
   const [imageURLs, setImageURLs] = useState<string[]>([]);

   const router = useRouter()

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

         console.log(response.data);
         if (response.data && response.data.data) {
            const photoUrl = response.data.data.url;
            setImageURL(photoUrl)
            setFile(null);
            setFilename("");
         }
      }
   };

   const varietals = [
      'Ancelotta',
      'Blanc de Malbecs',
      'Blanco Dulce',
      'Blend',
      'Blend de Blancas',
      'Blend de Malbecs',
      'Blend de Tintos',
      'Blend (Cabernet Sauvignon - Cabernet Franc)',
      'Blend (Malbec - Cabernet)',
      'Blend (Malbec - Cabernet Franc)',
      'Blend (Malbec - Merlot)',
      'Blend (Malbec - Syrah)',
      'Blend (Merlot - Cabernet Sauvignon)',
      'Blend (Moscatel - Torrontés)',
      'Blend (Cabernet Franc - Cabernet Sauvignon - Petit Verdot)',
      'Bonarda',
      'Cabernet',
      'Cabernet Franc',
      'Cabernet Sauvignon',
      'Camporotondo',
      'Carmenere',
      'Chardonnay',
      'Chenin Dulce',
      'Corte',
      'Corte Tinto',
      'Dulce Natural',
      'Gran Assemblage',
      'Gran Corte',
      'Gran Malbec',
      'Malbec',
      'Malbec Rosé',
      'Merlot',
      'Petit Verdot',
      'Pinot Noir',
      'Red Blend',
      'Rosado',
      'Rosado Blend',
      'Sangiovese',
      'Sauvignon Blanc',
      'Semillón',
      'Syrah',
      'Tannat',
      'Tempranillo',
      'Tinto',
      'Tinto de Corte',
      'Torrontés',
      'Torrontés Dulce Natural',
      'Torrontés Tardío',
      'Viognier',
      'Viognier Dulce',
   ]

   const handleDropdownToggle = () => {
      setIsDropdownOpen(prevState => !prevState);
   };

   const handleCheckboxChange = (value: string) => {
      if (!selectedVarietals.includes(value)) {
         let array: any = [...selectedVarietals]
         console.log(value)
         array.push(value)
         setSelectedVarietals(array)
      }
      else if (selectedVarietals.includes(value)) {
         let array: any = []
         for (let i = 0; i < selectedVarietals.length; i++) {
            if (selectedVarietals[i] !== value) {
               array.push(selectedVarietals[i])
            }
         }
         setSelectedVarietals(array)
      }
   }

   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await axios.get('/api/products');
            const products = response.data.wines;
            setData(products.sort(function (a: any, b: any) {
               if (a.name > b.name) {
                  return 1;
               }
               if (a.name < b.name) {
                  return -1;
               }
               return 0;
            }));

            const allOrganic = products.every((product: any) => product.organic);
            setIsOrganic(allOrganic);

            const imageUrls = products.map((product: any) => product.image);
            setImageURLs(imageUrls);
         } catch (error) {
            console.error("Error fetching data:", error);
         }
      };

      fetchData();
   }, []);

   const handleUpdateProduct = async (updatedProduct: Wine) => {
      try {
         const selectedProduct = data.find(product => product.id === updatedProduct.id);
         console.log(selectedProduct)
         const updateProduct = {
            ...updatedProduct,
            id: product?.id,
            name: selectedProduct?.name,
            cellar: selectedProduct?.cellar,
            reserve: selectedProduct?.reserve,
            barrel: selectedProduct?.barrel,
            milliliters: selectedProduct?.milliliters,
            organic: selectedProduct?.organic,
            varietal: selectedVarietals.length ? selectedVarietals : selectedProduct?.varietal,
            image: imageURL ? imageURL : selectedProduct?.image
         };
         await axios.put(`/api/products`, updateProduct);
         console.log("Producto actualizado:", updateProduct);
         setSelectedVarietals([])
         setIsOrganic(false)
         window.location.reload()
      } catch (error) {
         console.error("Error al actualizar el producto:", error);
      }
   }

   const handleDeleteProduct = async (id: string) => {
      try {
         await axios.post(`/api/deleteProduct`, { id: id });
         console.log("Producto eliminado:", id);
         window.location.reload()
      } catch (error) {
         console.error("Error al eliminar el producto:", error);
      }
   }

   return (
      <>
         <div className="flex flex-col items-center p-2">
            {process.env.NEXT_PUBLIC_DEVELOP ?
               <>
                  <button
                     className="text-white border border-white p-2"
                     onClick={() => router.push('/addProduct')}
                  >
                     Agregar nuevo producto
                  </button>
                  <div className="gap-2 grid grid-cols-3">

                     {data ? data.map(product => (
                        <p
                           key={product.name}
                           onClick={() => setProduct(product)}
                           className="text-white cursor-pointer border border-red-500 bg-black"
                        >{product.name}</p>
                     )) : null}
                  </div>
                  {product ?
                     <div key={product.id} className="flex flex-row w-full justify-between items-center flex-wrap text-white gap-2 border-2 border-red-500 p-2">
                        <p>{product.id}</p>
                        <Image
                           src={product?.image}
                           alt='imagen'
                           width={50}
                           height={50}
                           className="max-h-16 max-w-16"
                        />
                        <label>
                           Nombre:
                           <input
                              className="text-black"
                              type="text"
                              placeholder={product.name}
                              // value={editingProductId === product.id ? product.name : ''}
                              // onChange={(e) => console.log(e.target.value)}
                              onChange={(e) => setData(prevData => prevData.map(p => p.id === product.id ? { ...p, name: e.target.value } : p))}
                              onFocus={() => setEditingProductId(product.id)}
                              onBlur={() => setEditingProductId(null)}
                           />
                        </label>
                        <label>
                           Bodega:
                           <input
                              className="text-black"
                              type="text"
                              placeholder={product.cellar}
                              // value={editingProductId === product.id ? product.cellar : ''}
                              onChange={(e) => setData(prevData => prevData.map(p => p.id === product.id ? { ...p, cellar: e.target.value } : p))}
                              onFocus={() => setEditingProductId(product.id)}
                              onBlur={() => setEditingProductId(null)}
                           />
                        </label>
                        <label>
                           Región:
                           <input
                              className="text-black"
                              type="text"
                              placeholder={product.region}
                              // value={editingProductId === product.id ? product.region : ''}
                              onChange={(e) => setData(prevData => prevData.map(p => p.id === product.id ? { ...p, region: e.target.value } : p))}
                              onFocus={() => setEditingProductId(product.id)}
                              onBlur={() => setEditingProductId(null)}
                           />
                        </label>
                        <label>
                           Reserva
                           <input
                              className="text-black"
                              type="text"
                              placeholder={product.reserve}
                              // value={editingProductId === product.id ? product.reserve : ''}
                              onChange={(e) => setData(prevData => prevData.map(p => p.id === product.id ? { ...p, reserve: e.target.value } : p))}
                              onFocus={() => setEditingProductId(product.id)}
                              onBlur={() => setEditingProductId(null)}
                           />
                        </label>
                        <label>
                           Tiempo de Barrica
                           <input
                              className="text-black"
                              type="text"
                              placeholder={product.barrel}
                              // value={editingProductId === product.id ? product.barrel : ''}
                              onChange={(e) => setData(prevData => prevData.map(p => p.id === product.id ? { ...p, barrel: e.target.value } : p))}
                              onFocus={() => setEditingProductId(product.id)}
                              onBlur={() => setEditingProductId(null)}
                           />
                        </label>
                        <div className="flex flex-row">
                           <button onClick={handleDropdownToggle}>
                              {isDropdownOpen === true ? 'Ocultar' : 'Mostrar Varietales'}
                           </button>
                           {isDropdownOpen && (
                              <div className="flex flex-col">
                                 {varietals.map(varietal => (
                                    <label key={varietal}>
                                       <input
                                          type="checkbox"
                                          value={varietal}
                                          // checked={selectedVarietals.some(option => option === varietal)}
                                          checked={selectedVarietals.length ? selectedVarietals.some(option => option === varietal) : product.varietal.includes(varietal)}
                                          onChange={(e) => handleCheckboxChange(varietal)}
                                       />
                                       {varietal}
                                    </label>
                                 ))}
                              </div>
                           )}
                        </div>
                        <input
                           className="text-black"
                           type="text"
                           pattern="[0-9]*"
                           placeholder={product.milliliters.toString()}
                           // value={editingProductId === product.id ? product.milliliters : ''}
                           onChange={(e) => {
                              const value = e.target.value.replace(/\D/, ''); // Solo permite números
                              setData(prevData => prevData.map(p => p.id === product.id ? { ...p, milliliters: Number(value) } : p))
                           }}
                           onFocus={() => setEditingProductId(product.id)}
                           onBlur={() => setEditingProductId(null)}
                        />
                        <label>
                           <input
                              type="checkbox"
                              checked={product.organic}
                              onChange={(e) => setData(prevData => prevData.map(p => p.id === product.id ? { ...p, organic: e.target.checked } : p))}
                           />
                           Orgánico
                        </label>
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
                        <button className="w-full h-12 border border-white" onClick={() => handleUpdateProduct(product)}>Guardar</button>
                        <button className="w-full"
                           //  disabled
                           onClick={() => handleDeleteProduct(product.id)}
                        >Eliminar</button>
                     </div>
                     : null}
               </>
               : null}
         </div>
      </>
   )
}
