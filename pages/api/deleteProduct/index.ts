import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";

export default async function (req: NextApiRequest, res: NextApiResponse) {
   if (req.method === 'POST') {
      //DELETE
      const { id } = req.body;
      console.log(req.body)
      try {
         const deletedProduct = await prisma.wine.delete({
            where: { id: id }
         });

         return res.status(200).json(deletedProduct);
      } catch (error: any) {
         console.error(error);
         return res.status(400).json({ error: error.message });
      }
   }
}