import Navigation from '@/app/_components/Navigation';
import Logo from '@/app/_components/Logo';

import '@/app/_styles/globals.css';

// объявляем метаданные
export const metadata = {
    // заголовок сайта
    title: 'Mountain Valley',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className="bg-primary-950 text-primary-100 min-h-screen">
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
