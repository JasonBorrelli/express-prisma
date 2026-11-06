import 'dotenv/config';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient } from '../generated/prisma/index.js';


const adapter = new PrismaMariaDb(process.env.DATABASE_URL);
const  prisma = new PrismaClient({
    adapter: adapter,
});

async function main() {
    console.log('seeding started');

    await prisma.category.deleteMany()

    const categoriesName = ['Romanzi', 'Thriller', 'Biografici', 'Fantasy', 'Classici'];

    const categories = await prisma.category.createMany({
        data: categoriesName.map(cat => ({
            name: cat,
        })),
    });
    console.log(categories);
}

main()
    .catch(e=> {
        console.log(e);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());

