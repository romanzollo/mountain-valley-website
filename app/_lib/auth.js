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
    // настраиваем коллбэки при авторизации
    callbacks: {
        // функция проверки авторизации
        authorized({ auth, request }) {
            // если пользователь авторизован то возвращаем true (разрешаем доступ)
            return !!auth?.user; // !! - приводит к boolean
        },
    },
    // настраиваем роуты чтобы пользователь перенаправлялся на нужную страницу при авторизации
    pages: {
        signIn: '/login',
    },
};

export const {
    // функция авторизации для дальнейшего использования в серверных компонентах
    auth,
    signIn, // функция входа в систему
    signOut, // функция выхода из системы
    handlers: { GET, POST },
} = NextAuth(authConfig);
