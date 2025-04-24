import { eachDayOfInterval } from 'date-fns';

import { supabase } from './supabase';
import { notFound } from 'next/navigation';

/////////////
// GET

// функция получения данных о каюте
export async function getCabin(id) {
    const { data, error } = await supabase
        .from('cabins')
        .select('*')
        .eq('id', id)
        .single();

    // For testing
    // await new Promise((res) => setTimeout(res, 1000));

    if (error) {
        console.error(error);

        // Если каюта не нашлась, то мы перенаправляем пользователя на страницу 404 через встроенную функцию next.js
        notFound();
    }

    return data;
}

export async function getCabinPrice(id) {
    const { data, error } = await supabase
        .from('cabins')
        .select('regularPrice, discount')
        .eq('id', id)
        .single();

    if (error) {
        console.error(error);
    }

    return data;
}

export const getCabins = async function () {
    const { data, error } = await supabase
        .from('cabins')
        .select('id, name, maxCapacity, regularPrice, discount, image')
        .order('name');

    // For testing
    // await new Promise((res) => setTimeout(res, 2000));

    if (error) {
        console.error(error);
        throw new Error('Cabins could not be loaded');
    }

    return data;
};

// Гости идентифицируются по адресу электронной почты
export async function getGuest(email) {
    const { data, error } = await supabase
        .from('guests')
        .select('*')
        .eq('email', email)
        .single();

    // Здесь нет ошибки! Мы обрабатываем возможность отсутствия гостя при входе в систему в callback.
    return data;
}

export async function getBooking(id) {
    const { data, error, count } = await supabase
        .from('bookings')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error(error);
        throw new Error('Booking could not get loaded');
    }

    return data;
}

// функция получения всех заказов (бронирований) конкретного пользователя
export async function getBookings(guestId) {
    const { data, error, count } = await supabase
        .from('bookings')
        // На самом деле нам также нужны данные о каютах. Но будем брать ТОЛЬКО те данные, которые нам действительно нужны, чтобы уменьшить количество загружаемых данных.
        .select(
            'id, created_at, startDate, endDate, numNights, numGuests, totalPrice, guestId, cabinId, cabins(name, image)'
        )
        .eq('guestId', guestId)
        .order('startDate');

    if (error) {
        console.error(error);
        throw new Error('Bookings could not get loaded');
    }

    return data;
}

// функция получения занятых дат
export async function getBookedDatesByCabinId(cabinId) {
    let today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    today = today.toISOString();

    // Getting all bookings
    const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('cabinId', cabinId)
        .or(`startDate.gte.${today},status.eq.checked-in`);

    if (error) {
        console.error(error);
        throw new Error('Bookings could not get loaded');
    }

    // преобразование в фактические даты для отображения в data-picker
    const bookedDates = data
        .map((booking) => {
            return eachDayOfInterval({
                start: new Date(booking.startDate),
                end: new Date(booking.endDate),
            });
        })
        .flat();

    return bookedDates;
}

// функция получения настроек
export async function getSettings() {
    const { data, error } = await supabase
        .from('settings')
        .select('*')
        .single();

    // For testing
    // await new Promise((res) => setTimeout(res, 2000));

    if (error) {
        console.error(error);
        throw new Error('Settings could not be loaded');
    }

    return data;
}

export async function getCountries() {
    try {
        const res = await fetch(
            'https://restcountries.com/v2/all?fields=name,flag'
        );
        console.log(res.headers);
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const countries = await res.json();

        return countries;
    } catch (error) {
        console.error('Error fetching countries:', error.message);
        throw new Error('Could not fetch countries');
    }
}

// функция создания и добавления гостя в базу данных
export async function createGuest(newGuest) {
    const { data, error } = await supabase.from('guests').insert([newGuest]);

    if (error) {
        console.error(error);
        throw new Error('Guest could not be created');
    }

    return data;
}
