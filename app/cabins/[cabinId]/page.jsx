// API
import Cabin from '@/app/_components/Cabin';
import Reservation from '@/app/_components/Reservation';
import Spinner from '@/app/_components/Spinner';
import { getCabin, getCabins } from '@/app/_lib/data-service';
import { Suspense } from 'react';

// генерация метаданных
export async function generateMetadata({ params }) {
    // достаем имя каюты через params
    const { name } = await getCabin(params.cabinId);

    // возвращаем сгенерированные метаданные
    return {
        title: `Cabin ${name}`,
    };
}

// генерация статических маршрутов
export async function generateStaticParams() {
    // получаем данные о всех каютах
    const cabins = await getCabins();

    // создаем массив со всеми возможными маршрутами (cabinId)
    // cabinId - должен совпадать с [cabinId] в маршруте
    const ids = cabins.map((cabin) => ({ cabinId: String(cabin.id) })); // cabin.id - должен быть строкой

    return ids;
}

export default async function Page({ params }) {
    // params - встроенный обьект содержащий значения параметров URL

    // получаем данные о каюте через api в data-service.js
    const cabin = await getCabin(params.cabinId);

    return (
        <div className="max-w-6xl mx-auto mt-8">
            <Cabin cabin={cabin} />

            <div>
                <h2 className="text-5xl font-semibold text-center mb-10 text-accent-400">
                    Reserve {cabin.name} today. Pay on arrival.
                </h2>

                <Suspense fallback={<Spinner />}>
                    <Reservation cabin={cabin} />
                </Suspense>
            </div>
        </div>
    );
}
