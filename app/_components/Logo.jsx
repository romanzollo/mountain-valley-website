import Image from 'next/image';
import Link from 'next/link';
import logo from '@/public/logo.png';

function Logo() {
    return (
        <Link href="/" className="flex items-center gap-4 z-10">
            {/* простой вариант использования Image */}
            {/* <Image
                src="/logo.png"
                // при использовании компонента Image (Next.js) нужно указать пропсы height и width для предотвращения сдвига всего макета приложения
                height="60"
                width="60"
                alt="Mountain Valley"
            /> */}

            {/* более продвинутый вариант использования Image */}
            <Image
                src={logo}
                height="60"
                width="60"
                quality={100} // качество изображения
                alt="Mountain Valley"
            />
            <span className="text-xl font-semibold text-primary-100">
                Mountain Valley
            </span>
        </Link>
    );
}

export default Logo;
