'use client'

import { createContext, useContext, useState, useEffect } from "react"
import axios from "axios"
import { Dispatch, SetStateAction } from "react"


export const GlobalContext = createContext({
   products: [] as Wine[],
   setProducts: {} as Dispatch<SetStateAction<Wine[]>>,
   selectedVarietal: '',
   setSelectedVarietal: {} as Dispatch<SetStateAction<string>>,
   selectedCellar: '',
   setSelectedCellar: {} as Dispatch<SetStateAction<string>>,
   selectedReserve: '',
   setSelectedReserve: {} as Dispatch<SetStateAction<string>>,
   selectedRegion: '',
   setSelectedRegion: {} as Dispatch<SetStateAction<string>>,
   orderBy: '',
   setOrderBy: {} as Dispatch<SetStateAction<string>>,
   searchString: '',
   setSearchString: {} as Dispatch<SetStateAction<string>>,
})

export type Wine = {
   id: string,
   name: string,
   cellar: string,
   region: string,
   reserve: string,
   barrel: string,
   varietal: string[],
   milliliters: number,
   organic: boolean,
   image: string,
}

export type Sparkling = {
   id: string,
   name: string,
   cellar: string,
   region: string,
   type: string,
   varietal: string[],
   image: string
}

export type OtherDrink = {
   id: string,
   name: string,
   description: string,
   image: string
}

export type Extra = {
   id: string,
   name: string,
   image: string
}

export const GlobalContextProvider = ({ children }: any) => {
   const [totalProducts, setTotalProducts] = useState<any[]>([])
   const [products, setProducts] = useState<any[]>([])
   const [wines, setWines] = useState([])
   const [otherDrinks, setOtherDrinks] = useState([])
   const [sparklings, setSparklings] = useState([])
   const [extras, setExtras] = useState([])
   const [selectedVarietal, setSelectedVarietal] = useState('')
   const [selectedCellar, setSelectedCellar] = useState('')
   const [selectedReserve, setSelectedReserve] = useState('')
   const [selectedRegion, setSelectedRegion] = useState('')
   const [orderBy, setOrderBy] = useState('')
   const [searchString, setSearchString] = useState('')

   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await axios.get('/api/products');
            setWines(response.data.wines)
            setSparklings(response.data.sparklings)
            setOtherDrinks(response.data.otherDrinks)
            setExtras(response.data.extras)
            setTotalProducts([...response.data.wines, ...response.data.sparklings, ...response.data.otherDrinks, ...response.data.extras]);
            setProducts([...response.data.wines, ...response.data.sparklings, ...response.data.otherDrinks, ...response.data.extras]);
         } catch (error) {
            console.error('Error fetching products:', error);
         }
      };
      fetchData();
   }, []);

   useEffect(() => {
      const filterProducts = () => {
         let filteredProducts = [...totalProducts];

         if (selectedRegion) {
            console.log(selectedRegion)
            filteredProducts = filteredProducts.filter((product) => {
               if (product.region) {
                  return product.region.includes(selectedRegion)
               }
            });
         }

         if (selectedCellar) {
            filteredProducts = filteredProducts.filter((product: Wine) => product.cellar === selectedCellar);
         }

         if (selectedReserve) {
            filteredProducts = filteredProducts.filter((product: Wine) => product.reserve === selectedReserve);
         }

         if (selectedVarietal) {

            if (selectedVarietal === 'Tintos') {
               const allowedVarietals = [
                  'Ancelotta',
                  'Bonarda',
                  'Cabernet',
                  'Camporotondo',
                  'Carmenere',
                  'Malbec',
                  'Merlot',
                  'Petit Verdot',
                  'Pinot Noir',
                  'Red',
                  'Sangiovese',
                  'Syrah',
                  'Tannat',
                  'Tempranillo',
                  'Tinto',
                  'Tinto de Corte',
               ];
               filteredProducts = filteredProducts.filter((product) => {
                  if (product.varietal) {
                     const varietalsString = product.varietal.join(',');
                     return allowedVarietals.some(varietal => varietalsString.includes(varietal));
                  }
               });
            }
            if (selectedVarietal === 'Blancos') {
               const allowedVarietals = [
                  'Blanc',
                  'Blanca',
                  'Chardonnay',
                  'Chenin Dulce',
                  'Moscatel',
                  'Semillón',
                  'Torrontés',
                  'Viognier',
               ];
               filteredProducts = filteredProducts.filter((product) => {
                  if (product.varietal) {
                     const varietalsString = product.varietal.join(',');
                     return allowedVarietals.some(varietal => varietalsString.includes(varietal));
                  }
               });
            }
            if (selectedVarietal === 'Rosados') {
               const allowedVarietals = [
                  'Rosado',
                  'Malbec Rosé',
               ];
               filteredProducts = filteredProducts.filter((product) => {
                  if (product.varietal) {
                     const varietalsString = product.varietal.join(',');
                     return allowedVarietals.some(varietal => varietalsString.includes(varietal));
                  }
               });
            }
            if (selectedVarietal === 'Espumantes') {
               filteredProducts = filteredProducts.filter((product) => {
                  if (product.type) {
                     return product
                  }
               });
            }
            if (selectedVarietal === 'Otras bebidas') {
               filteredProducts = filteredProducts.filter((product) => {
                  if (product.description) {
                     return product
                  }
               });
            }
            if (selectedVarietal === 'Accesorios') {
               filteredProducts = filteredProducts.filter((product) => {
                  if (Object.keys(product).length < 4) {
                     return product
                  }
               })
            }
         }
         setProducts(filteredProducts);
      }

      filterProducts();
   }, [selectedVarietal, selectedCellar, selectedRegion, selectedReserve, orderBy]);


   useEffect(() => {
      const changeOrder = () => {
         const sortedProducts = [...products]
         if (orderBy === 'A-Z') {
            sortedProducts.sort((a: any, b: any) => a.name.localeCompare(b.name));
         } else if (orderBy === 'Z-A') {
            sortedProducts.sort((a: any, b: any) => b.name.localeCompare(a.name));
         }
         setProducts(sortedProducts);
      };
      changeOrder();
   }, [orderBy]);

   useEffect(() => {
      setSelectedCellar('')
      setSelectedRegion('')
      setSelectedReserve('')
      setSelectedVarietal('')
      setOrderBy('')
      const search = () => {
         const searchedProducts: Wine[] = []
         for (let i = 0; i < totalProducts.length; i++) {
            if (JSON.stringify(totalProducts[i].name.toLowerCase()).includes(searchString.toLowerCase()))
               searchedProducts.push(totalProducts[i])
            else if (totalProducts[i].cellar && JSON.stringify(totalProducts[i].cellar.toLowerCase()).includes(searchString.toLowerCase()))
               searchedProducts.push(totalProducts[i])
            else if (totalProducts[i].varietal && JSON.stringify(totalProducts[i].varietal.join().toLowerCase()).includes(searchString.toLowerCase()))
               searchedProducts.push(totalProducts[i])
         }
         setProducts(searchedProducts)
      }
      search()
      console.log(searchString)
   }, [searchString])

   return (
      <GlobalContext.Provider value={{
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
         searchString,
         setSearchString
      }}>
         {children}
      </GlobalContext.Provider>
   )
}

export const useGlobalContext = () => useContext(GlobalContext)
