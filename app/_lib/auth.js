import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';

// настройка
const authConfig = {
    // настраиваем провайдер
    providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
        }),
    ],
};

export const {
    auth,
    handlers: { GET, POST },
} = NextAuth(authConfig);
