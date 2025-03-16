import Link from 'next/link';
import { auth } from '../_lib/auth';

export default async function Navigation() {
    // так как функция auth() работает с файлами cookies и headers то автоматически переключает все маршруты к ДИНАМИЧЕСКОМУ рендерингу (файлы коки могут быть прочитаны только в процессе выполнения а не в процессе сборки), а панель навигации отображается на любой странице приложения (в каждом маршруте) следовательно наше приложение становиться полностью динамичным! (это важно!)
    const session = await auth(); // данные о авторизованном пользователе

    return (
        <nav className="z-10 text-xl">
            <ul className="flex gap-16 items-center">
                <li>
                    <Link
                        href="/cabins"
                        className="hover:text-accent-400 transition-colors"
                    >
                        Cabins
                    </Link>
                </li>
                <li>
                    <Link
                        href="/about"
                        className="hover:text-accent-400 transition-colors"
                    >
                        About
                    </Link>
                </li>
                <li>
                    {session?.user?.image ? (
                        <Link
                            href="/account"
                            className="hover:text-accent-400 transition-colors flex items-center gap-4"
                        >
                            <img
                                src={session.user.image}
                                alt={session.user.name}
                                // для коректного отображения картинок из google
                                referrerPolicy="no-referrer"
                                className=" h-8 rounded-full"
                            />
                            <span>Guest area</span>
                        </Link>
                    ) : (
                        <Link
                            href="/account"
                            className="hover:text-accent-400 transition-colors"
                        >
                            Guest area
                        </Link>
                    )}
                </li>
            </ul>
        </nav>
    );
}
