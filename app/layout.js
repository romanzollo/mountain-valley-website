import Navigation from './components/Navigation';
import Logo from './components/Logo';

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
