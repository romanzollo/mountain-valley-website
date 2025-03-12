/* компонент server action (серверный компонент), для входа в систему, будет выполняться только на сервере, то есть никогда не будет передоваться клиенту */
'use server';

import { signIn } from '@/app/_lib/auth';

export async function signInAction() {
    // авторизуем пользователя и переходим на страницу аккаунта
    await signIn('google', { redirectTo: '/account' }); // первый параметр - провайдер, второй - маршрут
}
