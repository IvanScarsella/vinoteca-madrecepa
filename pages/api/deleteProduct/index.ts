import { NextApiRequest, NextApiResponse } from "next";

export default async function (req: NextApiRequest, res: NextApiResponse) {
   if (req.method === 'POST') {
      const { id } = req.body;
      console.log(id)
      try {
         const response = await fetch(`http://localhost:4000/wines/${id}`, {
            method: 'DELETE',
            headers: {
               'Content-Type': 'application/json',
            },
         });

         if (!response.ok) {
            throw new Error('Failed to delete wine');
         }

         console.log('Wine deleted successfully');

         return res.status(200).json({ message: 'Wine deleted successfully' });
      } catch (error: any) {
         console.error('Error deleting wine:', error);
         return res.status(400).json({ error: error.message });
      }
   }
   // if (req.method === 'POST') {
   //    try {
   //       const deletedProduct = await prisma.wine.delete({

   //          where: { id: '9da1904e-52ac-4ef1-a249-cd077417c97e' }
   //       });

   //       return res.status(200).json(deletedProduct);
   //    } catch (error: any) {
   //       console.error(error);
   //       return res.status(400).json({ error: error.message });
   //    }
   // }
}