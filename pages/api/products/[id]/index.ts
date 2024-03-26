import { NextApiRequest, NextApiResponse } from "next";
import db from '../../../../db.json';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   if (req.method === 'GET') {
      try {
         const id = req.query.id;
         const product = db.wines.find((wine) => wine.id === id);

         if (!product) {
            try {
               const product = db.sparklings.find((wine) => wine.id === id);
               res.status(200).json(product);
            } catch (error) { }
         }
         if (!product) {
            const product = db.otherDrinks.find((product) => product.id === id);
            console.log(product)
            res.status(200).json(product);
         }
         if (!product) {
            const product = db.extras.find((product) => product.id === id);
            res.status(200).json(product);
         }

         if (product) {
            res.status(200).json(product);
         } else {
            res.status(404).json({ message: 'Producto no encontrado' });
         }
      } catch (error) {
         console.error('Error al obtener los datos:', error);
         res.status(500).json({ message: 'Error al obtener los datos' });
      }
   } else {
      res.status(405).json({ message: 'Método no permitido' });
   }
}
