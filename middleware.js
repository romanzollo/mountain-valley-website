// пример использования middleware
/* import { NextResponse } from 'next/server';

export function middleware(request) {
    console.log(request);

    // перенаправляем пользователя на другой маршрут
    return NextResponse.redirect(new URL('/about', request.url));
}
*/

// импортируем middleware из next-auth
import { auth } from '@/app/_lib/auth';

// переименовываем в middleware для удобства
export const middleware = auth;

// конфигурация
export const config = {
    // применять middleware только для определенных маршрутов
    matcher: ['/account'],
};
