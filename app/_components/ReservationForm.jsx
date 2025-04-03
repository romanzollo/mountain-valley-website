'use client';

import { differenceInDays, formatDate } from 'date-fns';

import { useReservation } from '@/app/_components/ReservationContext';

import SubmitButton from './SubmitButton';

import { createBooking } from '@/app/_lib/actions';

function ReservationForm({ cabin, user }) {
    // достаем данные из контекста (через кастомный хук контекста)
    const { range, resetRange } = useReservation();

    // вытаскиваем нужные нам данные из cabin
    const { maxCapacity, regularPrice, discount, id } = cabin;

    // вычисляем начало и конец выбранного диапазона бронирования
    const startDate = range.from;
    const endDate = range.to;

    // вычисляем количество ночей (с помощью differenceInDays из date-fns) и общую цену
    const numNights = differenceInDays(endDate, startDate);
    const cabinPrice = numNights * (regularPrice - discount);

    // формируем данные для дальнейшего бронирования
    const bookingData = {
        startDate,
        endDate,
        numNights,
        cabinPrice,
        cabinId: id,
    };

    // создаем функцию и используем bind чтобы передать данные для бронирования  в server action (трюк для передачи дополнительных данных вместо скрытых инпутов из документации next.js!!!)
    const createBookingWithData = createBooking.bind(null, bookingData);

    return (
        <div className="scale-[1.01]">
            <div className="bg-primary-800 text-primary-300 px-16 py-2 flex justify-between items-center">
                <p>Logged in as</p>

                <div className="flex gap-4 items-center">
                    <img
                        // Important to display google profile images
                        referrerPolicy="no-referrer"
                        className="h-8 rounded-full"
                        src={user.image}
                        alt={user.name}
                    />
                    <p>{user.name}</p>
                </div>
            </div>

            <form
                // action={createBookingWithData}

                // трюк с использованием server action в ручную чтобы можно было использовать функцию сброса диапазона дат (resetRange) из контекста (ReservationContext) в серверном компоненте + отключение уже выбранных дат
                action={async (formData) => {
                    await createBookingWithData(formData);

                    // сбрасываем диапазон дат
                    resetRange();
                }}
                className="bg-primary-900 py-10 px-16 text-lg flex gap-5 flex-col"
            >
                <div className="space-y-2">
                    <label htmlFor="numGuests">How many guests?</label>
                    <select
                        name="numGuests" // добавляем name в select чтобы отправлять его в action
                        id="numGuests"
                        className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm focus:bg-primary-800
                            focus:text-primary-200"
                        required
                    >
                        <option value="" key="">
                            Select number of guests...
                        </option>
                        {/* формируем опции в зависимости от максимального количества гостей (maxCapacity) */}
                        {Array.from(
                            { length: maxCapacity },
                            (_, i) => i + 1
                        ).map((x) => (
                            <option value={x} key={x}>
                                {x} {x === 1 ? 'guest' : 'guests'}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="space-y-2">
                    <label htmlFor="observations">
                        Anything we should know about your stay?
                    </label>
                    <textarea
                        name="observations" // добавляем name в textarea чтобы отправлять его в action
                        id="observations"
                        className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm focus:rounded-sm focus:bg-primary-800
                            focus:text-primary-200"
                        placeholder="Any pets, allergies, special requirements, etc.?"
                    />
                </div>

                <div className="flex justify-end items-center gap-6">
                    {!(startDate && endDate) ? (
                        <p className="text-primary-300 text-base">
                            Start by selecting dates
                        </p>
                    ) : (
                        <SubmitButton pendingLabel="Reserving...">
                            Reserve now
                        </SubmitButton>
                    )}
                </div>
            </form>
        </div>
    );
}

export default ReservationForm;
