'use client'

import { createContext, useContext, useState, useEffect } from "react"
import axios from "axios"
import { Dispatch, SetStateAction } from "react"

export const GlobalContext = createContext({
   products: [],
   setProducts: Dispatch<SetStateAction<Product[]>>,
   selectedVarietal: '',
   setSelectedVarietal: Dispatch<SetStateAction<string>>,
   selectedCellar: '',
   setSelectedCellar: Dispatch<SetStateAction<string>>,
   selectedReserve: '',
   setSelectedReserve: Dispatch<SetStateAction<string>>,
   selectedRegion: '',
   setSelectedRegion: Dispatch<SetStateAction<string>>,
   orderBy: '',
   setOrderBy: Dispatch<SetStateAction<string>>,
})

export type Product = {
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

export const GlobalContextProvider = ({ children }: any) => {
   const [totalProducts, setTotalProducts] = useState([])
   const [products, setProducts] = useState([])
   const [selectedVarietal, setSelectedVarietal] = useState('')
   const [selectedCellar, setSelectedCellar] = useState('')
   const [selectedReserve, setSelectedReserve] = useState('')
   const [selectedRegion, setSelectedRegion] = useState('')
   const [orderBy, setOrderBy] = useState('')

   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await axios.get('/api/products');
            setProducts(response.data);
            setTotalProducts(response.data);
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
            filteredProducts = filteredProducts.filter((product: Product) => product.region.includes(selectedRegion));
         }

         if (selectedCellar) {
            filteredProducts = filteredProducts.filter((product: Product) => product.cellar === selectedCellar);
         }

         if (selectedReserve) {
            filteredProducts = filteredProducts.filter((product: Product) => product.reserve === selectedReserve);
         }

         console.log(selectedVarietal)
         if (selectedVarietal) {

            if (selectedVarietal === 'Tinto') {
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
               filteredProducts = filteredProducts.filter((product: Product) => {
                  const varietalsString = product.varietal.join(',');
                  return allowedVarietals.some(varietal => varietalsString.includes(varietal));
               });
            }
            if (selectedVarietal === 'Blanco') {
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
               filteredProducts = filteredProducts.filter((product: Product) => {
                  const varietalsString = product.varietal.join(',');
                  return allowedVarietals.some(varietal => varietalsString.includes(varietal));
               });
            }
            if (selectedVarietal === 'Rosado') {
               const allowedVarietals = [
                  'Rosado',
                  'Malbec Rosé',
               ];
               filteredProducts = filteredProducts.filter((product: Product) => {
                  const varietalsString = product.varietal.join(',');
                  return allowedVarietals.some(varietal => varietalsString.includes(varietal));
               });
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
      }}>
         {children}
      </GlobalContext.Provider>
   )
}

export const useGlobalContext = () => useContext(GlobalContext)
