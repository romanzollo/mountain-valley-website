/* компонент server action (будет выполняться только на сервере),то есть никогда не будет передоваться клиенту */
'use server';

import { supabase } from '@/app/_lib/supabase';
import { auth, signIn, signOut } from '@/app/_lib/auth';

export async function updateGuest(formData) {
    // formData (название можно любое) - объект с данными из формы предоставляемое next.js API при отправке формы в server action
    /* ---
        при использовании server action (т.е. при серверной разработке) важно 2 вещи: 
            1. пользователь который запускает server action должен иметь разрешение на выполнение этого действия
            2. мы должны считать все входные данные не безопасными
    --- */

    // --- 1. авторизация и аутентификация --- //
    // получаем сессию пользователя
    const session = await auth();

    if (!session) throw new Error('You must be logged in!');

    // --- 2. проверяем правильность входных данных --- //
    // получаем данные из формы через web API (formData)
    const nationalID = formData.get('nationalID');
    // получаем данные из формы об национальности и флаге страны
    // т.к. данные приходят в виде строки (национальность%флаг), то мы разделяем их
    const [nationality, countryFlag] = formData.get('nationality').split('%');

    // проверяем правильность ввода национального ID (от 6 до 12 символов)
    if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
        throw new Error('Please provide a valid National ID!');

    // если все данные введены правильно, создаем объект с обновленными данными для дальнейшей передачи в функцию supabase
    const updateData = { nationality, countryFlag, nationalID };

    // обновляем данные гостя через supabase
    const { data, error } = await supabase
        .from('guests')
        .update(updateData)
        .eq('id', session.user.guestId); // обновляем данные гостя, когда наш созданный ранее id гостя в Auth.js при регистрации нового пользователя, равен id гостя в базе данных

    if (error) throw new Error('Guest could not be updated');
}

export async function signInAction() {
    // авторизуем пользователя и переходим на страницу аккаунта
    await signIn('google', { redirectTo: '/account' }); // первый параметр - провайдер, второй - маршрут
}

export async function signOutAction() {
    // выходим из системы и переходим на главную
    await signOut({ redirectTo: '/' });
}
