import { signInAction } from '@/app/_lib/actions';

function SignInButton() {
    return (
        // оборачиваем кнопку в форму для возможности использования action при нажатии (добавление интерактивности кнопки на стороне сервера. SignInButton - серверный компонент)
        <form action={signInAction}>
            <button className="flex items-center gap-6 text-lg border border-primary-300 px-10 py-4 font-medium">
                <img
                    src="https://authjs.dev/img/providers/google.svg"
                    alt="Google logo"
                    height="24"
                    width="24"
                />
                <span>Continue with Google</span>
            </button>
        </form>
    );
}

export default SignInButton;
