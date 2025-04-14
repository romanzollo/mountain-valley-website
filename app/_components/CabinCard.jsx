import { UsersIcon } from '@heroicons/react/24/solid';

import Image from 'next/image';
import Link from 'next/link';

function CabinCard({ cabin }) {
    const { id, name, maxCapacity, regularPrice, discount, image } = cabin;

    return (
        <Link href={`/cabins/${id}`} className="block group">
            {/* Добавляем класс group для родительского элемента */}
            <div className="flex border-primary-800 border">
                {/* компонент Image помещаем внутрь div с классом flex-1 и relative - чтобы бы изображения не растягивались */}
                <div className="flex-1 relative">
                    <Image
                        src={image}
                        fill
                        alt={`Cabin ${name}`}
                        // добавляем object-cover
                        className="object-cover border-r border-primary-800"
                    />
                </div>

                <div className="flex-grow">
                    <div className="pt-5 pb-4 px-7 bg-primary-950">
                        <h3 className="text-accent-500 font-semibold text-2xl mb-3">
                            Cabin {name}
                        </h3>

                        <div className="flex gap-3 items-center mb-2">
                            <UsersIcon className="h-5 w-5 text-primary-600" />
                            <p className="text-lg text-primary-200">
                                For up to{' '}
                                <span className="font-bold">{maxCapacity}</span>{' '}
                                guests
                            </p>
                        </div>

                        <p className="flex gap-3 justify-end items-baseline">
                            {discount > 0 ? (
                                <>
                                    <span className="text-3xl font-[350]">
                                        ${regularPrice - discount}
                                    </span>
                                    <span className="line-through font-semibold text-primary-600">
                                        ${regularPrice}
                                    </span>
                                </>
                            ) : (
                                <span className="text-3xl font-[350]">
                                    ${regularPrice}
                                </span>
                            )}
                            <span className="text-primary-200">/ night</span>
                        </p>
                    </div>

                    {/* Убираем второй <Link>, делаем кнопку статической */}
                    <div className="bg-primary-950 border-t border-t-primary-800 text-right ">
                        <div
                            // Используем group-hover для изменения стилей при наведении
                            className="border-l border-primary-800 py-4 px-6 inline-block transition-all 
                                      group-hover:bg-accent-600 group-hover:text-primary-900"
                        >
                            Details & reservation &rarr;
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default CabinCard;
