'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';

function Filter() {
    // useSearchParams - позволяет получать доступ к параметрам запроса URL-адреса и изменять их
    const searchParams = useSearchParams();
    // useRouter - позволяет переходить между маршрутами в Next.js
    const router = useRouter();
    // получаем текущий путь URL (/cabins)
    const pathname = usePathname();

    // получаем активный фильтр
    const activeFilter = searchParams.get('capacity') ?? 'all';

    // функция обработки клика по кнопке
    function handleFilter(filter) {
        // URLSearchParams - API для формирования строки поисковых параметров, которую потом можно использовать для формирования полного адреса
        const params = new URLSearchParams(searchParams);

        // устанавливаем (формируем) значение параметра capacity в зависимости от выбранного фильтра
        params.set('capacity', filter);

        // обновляем путь текущей страницы без добавления URL в стек history
        router.replace(
            // формируем новый URL адрес
            `${pathname}?${params.toString()}`,
            // отключаем прокрутку страницы
            { scroll: false }
        );
    }

    return (
        <div className="flex border border-primary-800">
            {/* все кабины */}
            <Button
                filter="all"
                handleFilter={handleFilter}
                activeFilter={activeFilter}
            >
                All cabins
            </Button>

            {/* от 1 до 3 */}
            <Button
                filter="small"
                handleFilter={handleFilter}
                activeFilter={activeFilter}
            >
                1&mdash;3 guests
            </Button>

            {/* от 4 до 7 */}
            <Button
                filter="medium"
                handleFilter={handleFilter}
                activeFilter={activeFilter}
            >
                4&mdash;7 guests
            </Button>

            {/* от 8 до 12 */}
            <Button
                filter="large"
                handleFilter={handleFilter}
                activeFilter={activeFilter}
            >
                8&mdash;12 guests
            </Button>
        </div>
    );
}

// компонент кнопки
function Button({ filter, handleFilter, activeFilter, children }) {
    return (
        <button
            className={`px-5 py-2 hover:bg-primary-700 ${
                filter === activeFilter ? 'bg-primary-700 text-primary-50' : '' // подсвечиваем активную кнопку
            }`}
            onClick={() => handleFilter(filter)}
        >
            {children}
        </button>
    );
}

export default Filter;
