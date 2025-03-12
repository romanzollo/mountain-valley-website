import { auth } from '@/app/_lib/auth';

// объявляем метаданные для текущей страницы
export const metadata = {
    title: 'Guest area',
};

export default async function Page() {
    // получаем данные о авторизованном пользователе
    const session = await auth();
    // достаем имя пользователя
    const firstName = session.user.name.split(' ').at(0);

    return (
        <h2 className="font-semibold text-2xl text-accent-400 mb-7">
            Welcome, {firstName}
        </h2>
    );
}
