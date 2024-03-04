import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../prisma/client'
//
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   if (req.method === "GET") {
      // if (Object.keys(req.body).length === 0) {
      // Realizar operación GET
      //
      try {
         const allWines = await prisma.wine.findMany();
         return res.status(200).json(allWines);
      } catch (error: any) {
         console.log(error);
         return res.status(500).json({ error: error.message });
      }
   } else if (req.method === "POST") {
      // Realizar operación POST
      console.log(req.body)
      const {
         name,
         cellar,
         region,
         reserve,
         barrel,
         varietal,
         milliliters,
         organic,
         image
      } = req.body;
      try {
         const newProduct = await prisma.wine.create({
            data: {
               name,
               cellar,
               region,
               reserve,
               barrel,
               varietal,
               milliliters,
               organic,
               image
            }
         });
         console.log(newProduct)
         return res.status(201).json(newProduct);
      } catch (error: any) {
         console.log(error);
         return res.status(400).json({ error: error.message });
      }
   } else if (req.method === 'PUT') {
      const {
         id,
         name,
         cellar,
         region,
         reserve,
         barrel,
         varietal,
         milliliters,
         organic,
         image
      } = req.body;
      // console.log(varietal)
      // const updatedVarietals: any = []
      // varietal.forEach((element: any) => {
      //    updatedVarietals.push(element.value)
      // });
      // console.log(updatedVarietals);

      const isWine = await prisma.wine.findUnique({
         where: {
            id: id
         }
      })

      try {
         if (isWine) {
            const updatedProduct = await prisma.wine.update({
               where: { id: id },
               data: {
                  name,
                  cellar,
                  region,
                  reserve,
                  barrel,
                  varietal,
                  milliliters,
                  organic,
                  image
               }
            });

            return res.status(200).json(updatedProduct);
         }
      } catch (error: any) {
         console.error(error);
         return res.status(400).json({ error: error.message });
      }
   }
   //  else if (req.method === 'DELETE') {

   //    const { id } = req.query;
   //    try {

   //       const deletedProduct = await prisma.wine.delete({
   //          where: { id: id }
   //       });

   //       return res.status(200).json(deletedProduct);
   //    } catch (error: any) {
   //       console.error(error);
   //       return res.status(400).json({ error: error.message });
   //    }
   // }

}
// }