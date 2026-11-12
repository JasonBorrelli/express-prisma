import prisma from "../lib/prisma.js";

export async function index(req, res) {
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
}

export async function show(req, res) {const id = Number(req.params.id)
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
}

export async function store(req, res) {
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
}

export async function update(req, res) {const id = Number(req.params.id);

    const { title, description, price, autor, isActive, categoryId } = req.body;

    await prisma.book.update({
        where:{
            id,
        },
        data: {
            title,
            description,
            autor,
            price,
            isActive,
            categoryId
        }
    })
    res.sendStatus(204).json({
        message: 'Book updated successfully'
    });
}

export async function destroy(req, res) {
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
     await prisma.book.delete({
        where: { id },
    });
 

    res.sendStatus(204);
}

