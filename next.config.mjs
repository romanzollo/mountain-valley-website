/** @type {import('next').NextConfig} */
const nextConfig = {
    // включаем поддержку remote patterns для загрузки изображений из Supabase
    // заполняем hostname и pathname своими данными
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'bziutcdwmcgruciwuwxb.supabase.co',
                port: '',
                pathname: '/storage/v1/object/public/cabin-images/**',
                // search: '',
            },
        ],
    },
    // включаем режим статического экспорта
    // чтобы можно было развернуть и разместить приложение на любом веб-сервере (SSG)
    // без генерации статических маршрутов (через generateStaticParams - если это требуются) была бы ошибка
    // output: 'export',
};

export default nextConfig;
