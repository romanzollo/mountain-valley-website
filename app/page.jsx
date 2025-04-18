import Link from 'next/link';
import Image from 'next/image';

// импортируем изображение, и тогда можно будет не задавать пропсы height и width в компоненте Image и сделать его адаптивным
import bg from '@/public/bg.png';

export default function Page() {
    return (
        <main className="mt-24">
            {/* пропс fill - заполняет все доступное пространство */}
            <Image
                src={bg}
                fill
                // размытие изображения пока загружается картинка
                placeholder="blur"
                quality={80}
                className="object-cover object-top"
                alt="Mountains and forests with two cabins"
            />

            <div className="relative z-10 text-center">
                <h1 className="text-8xl text-primary-50 mb-10 tracking-tight font-normal">
                    Where the wild meets serenity
                </h1>
                <Link
                    href="/cabins"
                    className="bg-accent-500 px-8 py-6 text-primary-800 text-lg font-semibold hover:bg-accent-600 transition-all"
                >
                    Explore luxury cabins
                </Link>
            </div>
        </main>
    );
}
