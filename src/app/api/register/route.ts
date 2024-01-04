import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { NextApiResponse } from 'next';

const prismadb = new PrismaClient();


export async function POST(req: Request, res: NextApiResponse) {
    if (req.method !== 'POST' ) {
        return res.status(405).json({ error: "only accept POST requests" });
    }
    try {
        const { email, name,  password } = await req.json();
        if(email.trim() === ""  || name.trim() === "" || password.trim() === "" || email.length < 6 || password.length < 6){
            return Response.error()
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await prismadb.user.create({
            data: {
                email,
                name,
                hashedPassword,
                emailVerified: new Date(),
            }
        });
        return Response.json(user);
    } catch (error) {
        return Response.json({ error: `Something went wrong: ${error}`});
    }
}
