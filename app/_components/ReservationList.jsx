'use client'; // т.к. используем хук (useOptimistic)

import { useOptimistic } from 'react';

import ReservationCard from '@/app/_components/ReservationCard';

import { deleteReservationAction } from '@/app/_lib/actions';

function ReservationList({ bookings }) {
    const [optimisticBookings, optimisticDelete] = useOptimistic(
        bookings,
        (currentBookings, bookingId) => {
            // удаляем бронь из списка
            return currentBookings.filter(
                (booking) => booking.id !== bookingId
            );

            // return [...currentBookings, newBooking] - вариант с добавлением новой брони
        }
    );

    // функция удаление бронирований с использованием server action и optimisticDelete
    async function handleDelete(bookingId) {
        // сперва моментально удаляем бронь из списка
        optimisticDelete(bookingId);

        // после уже удаляем бронь из базы данных через server action
        await deleteReservationAction(bookingId);
    }

    return (
        <ul className="space-y-6">
            {/* отображаем список бронирований используя optimisticBookings из хука useOptimistic */}
            {optimisticBookings.map((booking) => (
                <ReservationCard
                    booking={booking}
                    onDelete={handleDelete}
                    key={booking.id}
                />
            ))}
        </ul>
    );
}

export default ReservationList;
