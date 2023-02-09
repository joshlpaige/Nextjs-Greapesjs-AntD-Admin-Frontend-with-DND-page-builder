import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { accountController } from '@server/controllers';
import { User } from '@shared/types';

export default NextAuth({
    pages: {
        signIn: '/auth/login',
    },
    callbacks: {
        signIn: async ({ user }) => {
            return user ? true : false;
        },
        jwt: async ({ token, user }) => {
            if (user) {
                token.user = user;
            }
            return token;
        },
        session: async ({ session, token }) => {
            session.user = token.user as User;
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt',
        maxAge: 24 * 60 * 60,
    },
    providers: [
        CredentialsProvider({
            name: 'Credentials',

            credentials: {
                username: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            // @ts-ignore
            async authorize(credentials) {
                if (credentials?.username && credentials.password) {
                    const checkLogin = await accountController.checkLogin({
                        email: credentials.username,
                        password: credentials.password,
                    });
                    console.log(checkLogin);
                    if (checkLogin.success) return checkLogin.user || null;
                    return null;
                } else {
                    return null;
                }
            },
        }),
    ],
});
