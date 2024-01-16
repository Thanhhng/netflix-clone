import { NextApiRequest } from "next";
import { getServerSession } from "next-auth";
import prismadb from '@/libs/prismadb';

const serverAuth = async (req: NextApiRequest) => {
    const session = await getServerSession(req);
    if (!session?.user?.email) {
    throw new Error('Not signed in');
}

const currentUser = await prismadb.user.findUnique({
    where: {
        email: session.user.email,
    }});
    if (!currentUser) {
        throw new Error('Not signed in');
    }
    return { currentUser };
}

export default serverAuth;