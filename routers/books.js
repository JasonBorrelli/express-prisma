import express from "express";                  // importa express                          
import prisma from "../lib/prisma.js";         // importa prisma 

const router = express.Router();             // creo router   


router.get('/', async (req,res) => {           // definisce endpoint      
    const limit = req.query. limit;        // prendo i parametri che arrivano da req.limit    
 
    //SELECT * FROM BOOK
    const books = await prisma.book.findMany({            // seleziona tutti i libri        
        select: {                                     // definisce le colonne da selezionare                
            title: true,                                            
            autor: true,
            description:true,
            price: true,
        },
        take: limit ? Number(limit) : undefined,            // definisce il numero di libri da selezionare                 
    });
    res.json(books);                                    // restituisce i libri                   
    /* res.send('list of books'); */
});

router.get( '/:id', async (req, res,) => {               //  definisce endpoint              
    const id = Number(req.para                    // prendo i parametri che arrivano da req.params.id ms.id)
    if(!Number.isInteger(id)) {
        return res.status(400).json({
            error: 'Invalid book id'
        })
    }
    
    const book = await prisma.book.findUnique({     // seleziona un libro per id          
        where: {
            id,
        },
        include: {
            category: {
                 select: {
                    name: true,
                }
            }
            
        }
    });
    if (!book){                                    // se il libro non viene trovato                  
        return res.status(404).json({
            error: 'Book Not Found'
        }); 
    }
    res.json(book);                                     // restituisce il libro                       
})

router.post('/', async (req, res) => {                                               // definisce endpoint                      
    const { title, description, autor, price, isActive, categoryId} = req.body;       // prendo i parametri che arrivano da req.body

    const newBook = await prisma.book.create ({                                 // creo un nuovo libro              
        data: {
            title,
            description,
            autor,
            price, 
            isActive,
            categoryId, 
        },
      /*   select: {
            id: true
        }, */
    });

    res.status(201).json(newBook);                                 // restituisce il libro creato                 
})

export default router;                                             //esporta il router    

