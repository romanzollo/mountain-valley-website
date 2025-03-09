import DateSelector from '@/app/_components/DateSelector';
import ReservationForm from '@/app/_components/ReservationForm';

import LoginMessage from '@/app/_components/LoginMessage';

import { getBookedDatesByCabinId, getSettings } from '@/app/_lib/data-service';
import { auth } from '../_lib/auth';

async function Reservation({ cabin }) {
    // получаем данные настроек и какие даты заняты параллельно
    // чтобы не блокировать пользовательский интерфейс
    const [settings, bookedDates] = await Promise.all([
        getSettings(),
        getBookedDatesByCabinId(cabin.id),
    ]);

    // получаем данные о авторизованном пользователе
    const session = await auth();

    return (
        <div className="grid grid-cols-2 border border-primary-800 min-h-[400px]">
            <DateSelector
                settings={settings}
                bookedDates={bookedDates}
                cabin={cabin}
            />

            {session?.user ? (
                <ReservationForm cabin={cabin} user={session.user} />
            ) : (
                <LoginMessage />
            )}
        </div>
    );
}

export default Reservation;
