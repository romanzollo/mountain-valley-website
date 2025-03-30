/* компонент server action (будет выполняться только на сервере),то есть никогда не будет передоваться клиенту */
// use server - всегда используется в server action
'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { auth, signIn, signOut } from '@/app/_lib/auth';
import { getBookings } from '@/app/_lib/data-service';

import { supabase } from '@/app/_lib/supabase';

// обновление данных гостя
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

    // обновляем данные гостя в кэше по нужному нам маршруту
    revalidatePath('/account/profile');
}

// обновление бронирований
export async function updateBooking(formData) {
    // formData (название можно любое) - объект с данными из формы предоставляемое next.js API при отправке формы в server action
    /* ---
        при использовании server action (т.е. при серверной разработке) важно 2 вещи: 
            1. пользователь который запускает server action должен иметь разрешение на выполнение этого действия
            2. мы должны считать все входные данные не безопасными
    --- */

    // получаем id бронирования из формы (скрытый инпут)
    const bookingId = Number(formData.get('bookingId')); // преобразуем в число

    /* 1. аутентификация */
    const session = await auth();
    if (!session) throw new Error('You must be logged in!');

    /* 2. авторизация  */
    // защищаем данные от обновления не своих бронирований
    const guestBookings = await getBookings(session.user.guestId); // получаем все бронирования
    const guestBookingIds = guestBookings.map((booking) => booking.id); // получаем id всех бронирований
    // проверяем входит ли id бронирования в список бронирований гостя
    if (!guestBookingIds.includes(bookingId))
        throw new Error('You are not allowed to delete this booking!');

    /* 3. создание обновленных данных */
    const updateData = {
        numGuests: Number(formData.get('numGuests')),
        observations: formData.get('observations').slice(0, 1000), // обрезаем строку до 1000 символов
    };

    /* 4. мутация */
    const { error } = await supabase
        .from('bookings')
        .update(updateData)
        .eq('id', bookingId)
        .select()
        .single();

    /* 5. обработка ошибок */
    if (error) throw new Error('Booking could not be updated');

    /* 6. обновление кэша */
    revalidatePath('/account/reservations');
    revalidatePath(`/account/reservations/edit/${bookingId}`);

    /* 7. редирект */
    redirect('/account/reservations');
}

// создание бронирования
export async function createBooking(bookingData, formData) {
    // formData (название можно любое) - объект с данными из формы предоставляемое next.js API при отправке формы в server action
    // добавляем bookingData чтобы formData передавался последним (НЕ ПЕРВЫМ) аргументом!!!, т.к. мы используем метод bind в ReservationForm.jsx !!! ('обходной путь' передачи дополнительных данных вместо скрытых инпутов из документации next.js)

    // получаем сессию пользователя и проверяем авторизацию
    const session = await auth();
    if (!session) throw new Error('You must be logged in!');

    // создаем объект с данными нового бронирования
    const newBooking = {
        ...bookingData,
        guestId: session.user.guestId,
        numGuests: Number(formData.get('numGuests')),
        observations: formData.get('observations').slice(0, 1000),
        extrasPrice: 0,
        totalPrice: bookingData.cabinPrice,
        isPaid: false,
        hasBreakfast: false,
        status: 'unconfirmed',
    };
    // вариант использования если у нас много данных в форме formData (чтобы не использовать постоянно formData.get(...))
    // Object.entries(formData.entries())

    // добавляем новое бронирование в базу данных supabase
    const { error } = await supabase.from('bookings').insert([newBooking]);

    if (error) throw new Error('Booking could not be created');

    // обновляем кэш
    revalidatePath(`/cabins/${bookingData.cabinId}`);

    // редирект
    redirect('/cabins/thankyou');
}

// удаление бронирований
export async function deleteBooking(bookingId) {
    // For testing
    // await new Promise((res) => setTimeout(res, 2000));

    // получаем сессию пользователя и проверяем авторизацию
    const session = await auth();
    if (!session) throw new Error('You must be logged in!');

    /* защищаем данные от удаления не своих бронирований */
    // получаем все бронирования
    const guestBookings = await getBookings(session.user.guestId);
    // получаем id всех бронирований
    const guestBookingIds = guestBookings.map((booking) => booking.id);
    // проверяем входит ли id бронирования в список бронирований гостя
    if (!guestBookingIds.includes(bookingId))
        throw new Error('You are not allowed to delete this booking!');

    // получаем id кабины по id бронирования (для обновления кэша)
    const cabinId = guestBookings.find(
        (booking) => booking.id === bookingId
    ).cabinId;

    // удаляем бронь из базы данных supabase
    const { error } = await supabase
        .from('bookings')
        .delete()
        .eq('id', bookingId);

    if (error) throw new Error('Booking could not be deleted');

    // обновляем данные гостя в кэше по нужному нам маршруту
    revalidatePath('/account/reservations');
    revalidatePath(`/cabins/${cabinId}`);
}

// авторизация
export async function signInAction() {
    // авторизуем пользователя и переходим на страницу аккаунта
    await signIn('google', { redirectTo: '/account' }); // первый параметр - провайдер, второй - маршрут
}

// выход
export async function signOutAction() {
    // выходим из системы и переходим на главную
    await signOut({ redirectTo: '/' });
}
