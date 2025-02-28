// import { unstable_noStore as noStore } from 'next/cache';

import CabinCard from '@/app/_components/CabinCard';

import { getCabins } from '@/app/_lib/data-service';

async function CabinList({ filter }) {
    // вариант отключения кэширования данных в данном компоненте
    // noStore();

    const cabins = await getCabins();

    if (cabins.length === 0) return null;

    // фильтруем каюты исходя из выбранного фильтра (filter) который передается из компонента Page
    let displayedCabins;
    if (filter === 'all') displayedCabins = cabins;
    if (filter === 'small')
        displayedCabins = cabins.filter((cabin) => cabin.maxCapacity <= 3);
    if (filter === 'medium')
        displayedCabins = cabins.filter(
            (cabin) => cabin.maxCapacity >= 4 && cabin.maxCapacity <= 7
        );
    if (filter === 'large')
        displayedCabins = cabins.filter((cabin) => cabin.maxCapacity >= 8);

    return (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
            {displayedCabins.map((cabin) => (
                <CabinCard cabin={cabin} key={cabin.id} />
            ))}
        </div>
    );
}

export default CabinList;
