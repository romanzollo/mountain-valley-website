// т.к. мы используем обработчик нажатия кнопки (onClick) внутри компонента, то нам для этого нужен JS поэтому компонент должен быть клиентским
'use client';

import { TrashIcon } from '@heroicons/react/24/solid';
import { deleteReservationAction } from '@/app/_lib/actions';

function DeleteReservation({ bookingId }) {
    /* пример использования server action прямо в компоненте */
    // function deleteReservationAction() {
    //     'use server';
    //     // code
    // }

    return (
        <button
            // пример использования server action не в form + action а через onClick
            onClick={() => deleteReservationAction(bookingId)}
            className="group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900"
        >
            <TrashIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
            <span className="mt-1">Delete</span>
        </button>
    );
}

export default DeleteReservation;
