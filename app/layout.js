import Navigation from '@/app/_components/Navigation';
import Logo from '@/app/_components/Logo';

// импортируем шрифт
import { Josefin_Sans } from 'next/font/google';
// настраиваем шрифт
const josefin = Josefin_Sans({
    subsets: ['latin'], // выбираем тип шрифта ( latin, cyrillic, ... )
    display: 'swap',
});

import '@/app/_styles/globals.css';

// объявляем метаданные
export const metadata = {
    // заголовок сайта
    title: {
        // %s - динамический параметр
        template: '%s / Mountain Valley',
        default: 'Welcome / Mountain Valley',
    },
    description:
        'Luxurious cabin hotel, located in the heart of the Italian Dolomites, surrounded by beautiful mountains and dark forests.',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body
                // добавляем класс шрифта josefin.className для подключения шрифта
                className={`${josefin.className} bg-primary-950 text-primary-100 min-h-screen`}
            >
                <header>
                    <Logo />
                    <Navigation />
                </header>

                <main>{children}</main>

                <footer>Coopyright by Mountain Valley</footer>
            </body>
        </html>
    );
}
