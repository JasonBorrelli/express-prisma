import 'dotenv/config';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient } from '../generated/prisma/index.js';



const adapter = new PrismaMariaDb(process.env.DATABASE_URL);
const  prisma = new PrismaClient({
    adapter: adapter,
});

const randomArrayIndex = (length) => Math.floor(Math.random() * length);



async function main() {
    console.log('seeding started');

    await prisma.book.deleteMany();
    await prisma.category.deleteMany()

//GENERAZIONE CATEGORIE

    const categoriesName = ['Romanzi', 'Thriller', 'Biografici', 'Fantasy', 'Classici'];

    await prisma.category.createMany({
        data: categoriesName.map(cat => ({
            name: cat,
        })),
    });
      


    // SELECT * FROM CATEGORY
    const categories = await prisma.category.findMany();


    //GENERAZIONE LIBRI

    const books = [];
    for (let index = 0; index < 10; index++) {
        books.push({
            title: `book ${index + 1}`,
            description: `this is description for book ${index + 1}`,
            autor:'Mario Rossi',
            price:9.99,
            categoryId: categories[randomArrayIndex(categories.length)].id
        })
    }

    //INVIARE LA QUERY AL DB PER L'INSERIMENTO

    await prisma.book.createMany({
        data: books,
    });

}

main()
    .catch(e=> {
        console.log(e);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());

