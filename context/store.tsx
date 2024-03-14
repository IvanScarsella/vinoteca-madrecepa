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
   const [products, setProducts] = useState([])
   const [selectedVarietal, setSelectedVarietal] = useState('')
   const [selectedCellar, setSelectedCellar] = useState('')
   const [selectedReserve, setSelectedReserve] = useState('')
   const [selectedRegion, setSelectedRegion] = useState('')
   const [orderBy, setOrderBy] = useState('')
   useEffect(() => {
      const fetchData = async () => {
         const response = await axios.get('/api/products');
         setProducts(response.data)
      }
      fetchData()
   }, [])

   useEffect(() => {
      console.log(selectedVarietal, selectedRegion, selectedCellar, selectedReserve, orderBy)

      const filterProducts = () => {

      }
      filterProducts()

   }, [
      selectedVarietal,
      selectedCellar,
      selectedRegion,
      selectedReserve,
      orderBy
   ])

   useEffect(() => {
      const changeOrder = async () => {
         if (orderBy === 'A-Z') {
            await setProducts(products.sort(function (a: any, b: any) {
               if (a.name > b.name) {
                  return 1;
               }
               if (a.name < b.name) {
                  return -1;
               }
               return 0;
            }))
         }
         else if (orderBy === 'Z-A') {
            await setProducts(products.sort(function (a: any, b: any) {
               if (a.name > b.name) {
                  return -1;
               }
               if (a.name < b.name) {
                  return 1;
               }
               return 0;
            }))
         }
      }
      changeOrder()
   }, [orderBy])

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
