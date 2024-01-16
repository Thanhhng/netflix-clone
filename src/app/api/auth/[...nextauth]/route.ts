import NextAuth from "next-auth"
import { compare } from 'bcrypt';
import Credentials from 'next-auth/providers/credentials';
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GitHubProvider from "next-auth/providers/github";
import client from "@/libs/prismadb";


const authOptions = NextAuth({
    providers:[
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as "",
        }
        ),
        GitHubProvider({
            clientId: process.env.GITHUB_ID as "",
            clientSecret: process.env.GITHUB_SECRET as "",
        }),
        Credentials({
            id: 'credentials',
            name: 'Credentials',
            credentials: {
                email: {
                    label: 'Email',
                    type: 'text',
                },
                password: {
                    label: 'Password',
                    type: 'password'
                }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Email and password required');
                }
                try {
                    const user = await client.user.findUnique({
                        where :{
                            email: credentials.email
                        }
                    });
                    if (!user || !user.hashedPassword) {
                        throw new Error('Email does not exist');
                    }
                    const isCorrectPassword = await compare(credentials.password, user.hashedPassword);
                    if (!isCorrectPassword) {
                        throw new Error('Reason: Incorrect password');
                    }
                    console.log({user})
                    return user;
                } catch (err) {
                    console.log("can't authorize" + err);
                    return null;
                }
            }
        })
    ],
    pages: {
        signIn : '/auth'
    },
    debug : process.env.NODE_ENV === 'development',
    adapter: PrismaAdapter(client),
    session : {
        strategy : 'jwt'
    },
    jwt:{
        secret : process.env.NEXTAUTH_JWT_SECRET
    },
    secret : process.env.NEXTAUTH_SECRET
})

export {authOptions as GET, authOptions as POST}
