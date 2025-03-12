import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/solid';

import { signOutAction } from '@/app/_lib/actions';

function SignOutButton() {
    return (
        // оборачиваем кнопку в форму для возможности использования action при нажатии (чтобы выполнять это действие на стороне сервера, даже не смотря на то, что SignOutButton - клиентский компонент)
        <form action={signOutAction}>
            <button className="py-3 px-5 hover:bg-primary-900 hover:text-primary-100 transition-colors flex items-center gap-4 font-semibold text-primary-200 w-full">
                <ArrowRightOnRectangleIcon className="h-5 w-5 text-primary-600" />
                <span>Sign out</span>
            </button>
        </form>
    );
}

export default SignOutButton;
