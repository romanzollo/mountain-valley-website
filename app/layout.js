import Navigation from '@/app/_components/Navigation';
import Logo from '@/app/_components/Logo';

// объявляем метаданные
export const metadata = {
    // заголовок сайта
    title: 'Mountain Valley',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
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
