'use client';

import {
    CalendarDaysIcon,
    HomeIcon,
    UserIcon,
} from '@heroicons/react/24/solid';
import { usePathname } from 'next/navigation';

import SignOutButton from './SignOutButton';
import Link from 'next/link';

// массив ссылок
const navLinks = [
    {
        name: 'Home', // имя ссылки
        href: '/account', // ссылка
        icon: <HomeIcon className="h-5 w-5 text-primary-600" />, // иконка
    },
    {
        name: 'Reservations', // имя ссылки
        href: '/account/reservations', // ссылка
        icon: <CalendarDaysIcon className="h-5 w-5 text-primary-600" />, // иконка
    },
    {
        name: 'Guest profile', // имя ссылки
        href: '/account/profile', // ссылка
        icon: <UserIcon className="h-5 w-5 text-primary-600" />, // иконка
    },
];

function SideNavigation() {
    // вычисляем текущий путь через встроенный хук usePathname
    // '/account', '/account/reservations' или '/account/profile'
    const pathname = usePathname();

    return (
        <nav className="border-r border-primary-900">
            <ul className="flex flex-col gap-2 h-full text-lg">
                {/* создаем ссылки динамически из массива */}
                {navLinks.map((link) => (
                    <li key={link.name}>
                        <Link
                            className={`py-3 px-5 hover:bg-primary-900 hover:text-primary-100 transition-colors flex items-center gap-4 font-semibold text-primary-200 
                                /* подсвечиваем активную ссылку */
                                ${
                                    pathname === link.href
                                        ? 'bg-primary-900'
                                        : ''
                                }`}
                            href={link.href}
                        >
                            {link.icon}
                            <span>{link.name}</span>
                        </Link>
                    </li>
                ))}

                {/* кнопка выхода */}
                <li className="mt-auto">
                    <SignOutButton />
                </li>
            </ul>
        </nav>
    );
}

export default SideNavigation;
