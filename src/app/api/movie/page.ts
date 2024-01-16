import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

async function page() {
    const moviesCount = await prisma.movie.findMany();
    return moviesCount;
}

export default page;
