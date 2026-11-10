import express from "express";                  // importa express                          
import prisma from "../lib/prisma.js";         // importa prisma 

const router = express.Router();


router.get('/', async (req,res) => {
    const limit = req.query.limit;

    //SELECT * FROM BOOK
    const books = await prisma.book.findMany({
        select: {
            title: true,
            autor: true,
            description:true,
            price: true,
        },
        take: limit ? Number(limit) : undefined,
    });
    res.json(books);
    /* res.send('list of books'); */
});

router.get( '/:id', async (req, res,) => {
    const id = Number(req.params.id)
    if(!Number.isInteger(id)) {
        return res.status(400).json({
            error: 'Invalid book id'
        })
    }
    
    const book = await prisma.book.findUnique({
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
    if (!book){
        return res.status(404).json({
            error: 'Book Not Found'
        }); 
    }
    res.json(book);
})

router.post('/', async (req, res) => {
    const { title, description, autor, price, isActive, categoryId} = req.body;

    const newBook = await prisma.book.create({
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

    res.status(201).json(newBook);
})

router.delete('/:id', async (req, res) => {
    const id = Number (req.params.id);

    if(!Number.isInteger(id)) {
        return res.status(400).json({
            error: 'Invalid Book Id',
        });
    }  
    
     const book = await prisma.book.findUnique({
        where: {
            id,
        },
        
    });
    if (!book){
        return res.status(404).json({
            error: 'Book Not Found'
        }); 
    }

    res.sendStatus(204);
})

export default router;

