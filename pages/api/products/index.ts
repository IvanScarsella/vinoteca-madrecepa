import { NextApiRequest, NextApiResponse } from 'next'
import db from '../../../db.json'
import { v4 as uuidv4 } from 'uuid';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   if (req.method === 'GET') {
      try {
         const wines = db.wines

         res.status(200).json(wines)
      } catch (error) {
         console.error('Error al obtener los datos:', error)
         res.status(500).json({ message: 'Error al obtener los datos' })
      }
   }
   else if (req.method === "POST") {
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
         const newProduct = {
            id: uuidv4(),
            name,
            cellar,
            region,
            reserve,
            barrel,
            varietal,
            milliliters,
            organic,
            image
         };
         const response = await fetch('http://localhost:4000/wines', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify(newProduct),
         });
         const data = await response.json();
         console.log(data);
         return res.status(201).json(data);
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

      try {
         const response = await fetch(`http://localhost:4000/wines/${id}`, {
            method: 'PUT',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({
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
            }),
         });

         // Verificar si la solicitud fue exitosa
         if (!response.ok) {
            throw new Error('Failed to update wine');
         }

         // Obtener el resultado de la actualización
         const updatedWine = await response.json();
         console.log('Wine updated:', updatedWine);

         // Devolver la respuesta actualizada
         return res.status(200).json(updatedWine);
      } catch (error: any) {
         console.error('Error updating wine:', error);
         return res.status(400).json({ error: error.message });
      }
   }

}


// import { NextApiRequest, NextApiResponse } from 'next';
// import prisma from '../../../prisma/client'

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//    if (req.method === "GET") {

//       try {
//          const allWines = await prisma.wine.findMany();
//          return res.status(200).json(allWines);
//       } catch (error: any) {
//          console.log(error);
//          return res.status(500).json({ error: error.message, stack: error.stack });
//       }
//    }
//    else if (req.method === "POST") {
//       console.log(req.body)
//       const {
//          name,
//          cellar,
//          region,
//          reserve,
//          barrel,
//          varietal,
//          milliliters,
//          organic,
//          image
//       } = req.body;
//       try {
//          const newProduct = await prisma.wine.create({
//             data: {
//                name,
//                cellar,
//                region,
//                reserve,
//                barrel,
//                varietal,
//                milliliters,
//                organic,
//                image
//             }
//          });
//          console.log(newProduct)
//          return res.status(201).json(newProduct);
//       } catch (error: any) {
//          console.log(error);
//          return res.status(400).json({ error: error.message });
//       }
//    } else if (req.method === 'PUT') {
//       const {
//          id,
//          name,
//          cellar,
//          region,
//          reserve,
//          barrel,
//          varietal,
//          milliliters,
//          organic,
//          image
//       } = req.body;

//       const isWine = await prisma.wine.findUnique({
//          where: {
//             id: id
//          }
//       })

//       try {
//          if (isWine) {
//             const updatedProduct = await prisma.wine.update({
//                where: { id: id },
//                data: {
//                   name,
//                   cellar,
//                   region,
//                   reserve,
//                   barrel,
//                   varietal,
//                   milliliters,
//                   organic,
//                   image
//                }
//             });

//             return res.status(200).json(updatedProduct);
//          }
//       } catch (error: any) {
//          console.error(error);
//          return res.status(400).json({ error: error.message });
//       }
//    }
// }