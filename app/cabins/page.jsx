import { Suspense } from 'react';

import CabinList from '@/app/_components/CabinList';
import Spinner from '@/app/_components/Spinner';
import Filter from '@/app/_components/Filter';

// вариант отключения кэширования данных всей страницы (ISR)
// export const revalidate = 0;

// при использовани serchParams компонент страницы станет динамическим вместо статического - т.е. будет обновляться при изменении searchParams, поэтому revalidate работать не будет, смысла в данном случае в нем нет!
// задаем время обновления данных страницы и кэширования (ISR)
// export const revalidate = 3600; // 1 час (в секундах)

// объявляем метаданные для текущей страницы
export const metadata = {
    title: 'Cabins',
};

export default function Page({ searchParams }) {
    // searchParams - встроенный в Next.js объект, содержащий параметры URL. searchParams можно использовать только на странице (Page)
    // каждый раз при изменении searchParams (URL) этот серверный компонент будет обновляться и перерисовываться + все дочернии компоненты такие как CabinList

    // получаем значение параметра capacity из URL если он есть, иначе устанавливаем значение по умолчанию 'all'
    const filter = searchParams?.capacity ?? 'all';

    return (
        <div>
            <h1 className="text-4xl mb-5 text-accent-400 font-medium">
                Our Luxury Cabins
            </h1>
            <p className="text-primary-200 text-lg mb-10">
                Cozy yet luxurious cabins, located right in the heart of the
                Italian Dolomites. Imagine waking up to beautiful mountain
                views, spending your days exploring the dark forests around, or
                just relaxing in your private hot tub under the stars. Enjoy
                nature&apos;s beauty in your own little home away from home. The
                perfect spot for a peaceful, calm vacation. Welcome to paradise.
            </p>

            {/* фильтр */}
            <div className="flex justify-end mb-8">
                <Filter />
            </div>

            {/* 
                используем suspense для отображения спинера до тех пор, пока его дочерние элементы не закончат загрузку,
                key позволяет обновить компонент при изменении filter 
            */}
            <Suspense fallback={<Spinner />} key={filter}>
                {/* передаем параметр filter серверному компоненту CabinList */}
                <CabinList filter={filter} />
            </Suspense>
        </div>
    );
}
