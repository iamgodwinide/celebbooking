import { connectDb } from "@/config";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Invalid credentials");
                }

                await connectDb();

                const user = await User.findOne({ email: credentials.email });

                if (!user || !user.password) {
                    throw new Error("Invalid credentials");
                }

                const isCorrectPassword = await bcrypt.compare(
                    credentials.password,
                    user.password
                );

                if (!isCorrectPassword) {
                    throw new Error("Invalid credentials");
                }

                return {
                    id: user._id,
                    email: user.email,
                    role: user.role,
                };
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                return {
                    ...token,
                    role: user.role
                }
            }
            return token;
        },
        async session({ session, token }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    role: token.role
                }
            }
        }
    },
    pages: {
        signIn: '/admin/login',
    },
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET
})

export { handler as GET, handler as POST }
