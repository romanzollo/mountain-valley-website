/* --- пример использования middleware из next.js --- */
/* import { NextResponse } from 'next/server';

export function middleware(request) {
    console.log(request);

    // перенаправляем пользователя на другой маршрут
    return NextResponse.redirect(new URL('/about', request.url));
}
*/

/* --- вариант с применением middleware из auth.js --- */
// импортируем middleware из auth.js
import { auth } from '@/app/_lib/auth';

// переименовываем в middleware для удобства
export const middleware = auth;

// конфигурация
export const config = {
    // matcher - массив маршрутов, к которым применять middleware
    matcher: ['/account'],
};
