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
                search: '',
            },
        ],
    },
};

export default nextConfig;
