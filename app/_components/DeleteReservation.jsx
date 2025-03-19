// т.к. мы используем обработчик нажатия кнопки (onClick) внутри компонента, то нам для этого нужен JS поэтому компонент должен быть клиентским
'use client';

import { TrashIcon } from '@heroicons/react/24/solid';
import { useTransition } from 'react';

import SpinnerMini from '@/app/_components/SpinnerMini';

import { deleteReservationAction } from '@/app/_lib/actions';

function DeleteReservation({ bookingId }) {
    // useTransition - обновляет состояние компонента без блокировки пользовательского интерфейса
    // используем если хотим отображать индикатор загрузки при использовании server action напрямую с кнопки (onClick) а не формы
    const [isPending, startTransition] = useTransition();

    // используем если хотим отображать индикатор загрузки при использовании server action напрямую с кнопки (onClick)
    function handleDelete() {
        // спрашиваем у пользователя
        if (confirm('Are you sure you want to delete this reservation?'))
            // используем transition для отображения индикатора загрузки
            startTransition(() => deleteReservationAction(bookingId));
    }

    /* пример использования server action прямо в компоненте */
    // function deleteReservationAction() {
    //     'use server';
    //     // code
    // }

    return (
        <button
            // пример использования server action не в form + action а через onClick
            onClick={handleDelete}
            className="group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900"
        >
            {!isPending ? (
                <>
                    <TrashIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
                    <span className="mt-1">Delete</span>
                </>
            ) : (
                <span className="mx-auto">
                    <SpinnerMini />
                </span>
            )}
        </button>
    );
}

export default DeleteReservation;
