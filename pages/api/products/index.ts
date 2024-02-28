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
   } else {
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
         const newProperty = await prisma.wine.create({
            data: {
               name: name,
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

         return res.status(201).json(newProperty);
      } catch (error: any) {
         console.log(error);
         return res.status(400).json({ error: error.message });
      }
   }
}
// }