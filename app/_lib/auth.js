import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';

import { createGuest, getGuest } from './data-service';

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
        // функция входа в систему
        // выполняется до того как начинается процесс регистрации (ввел данные и нажал кнопку входа но еще не зашел в систему)
        async signIn({ user, account, profile }) {
            try {
                const existingGuest = await getGuest(user.email);

                // создаем гостя если его нет
                if (!existingGuest)
                    // не забываем про await чтобы дождаться выполнения запроса
                    await createGuest({
                        email: user.email,
                        fullName: user.name,
                    });

                return true;
            } catch {
                return false; // запрещаем вход
            }
        },
        // функция получения данных о пользователе
        // выполняется после того как пользователь зашел в систему
        async session({ session, user }) {
            // получаем данные о госте
            const guest = await getGuest(session.user.email); // не забываем про await чтобы дождаться выполнения запроса

            // добавляем id гостя в сессию пользователя для дальнейшего использования с базой данных и в приложении (supabase в нашем случае)
            session.user.guestId = guest.id;

            // возвращаем сессию
            return session;
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
