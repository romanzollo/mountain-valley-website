'use client';

import { useFormStatus } from 'react-dom';

// переносим кнопку в отдельный компонент чтобы использовать хук useFormStatus так как он может использоваться только внутри формы
// если бы весь компонент UpdateProfileForm был серверный то пришлось бы компонент Button переносить в отдельный файл и делать его клиентским компонентом
function SubmitButton({ children, pendingLabel }) {
    // хук для возможности виуализации отправки формы
    const { pending } = useFormStatus();

    return (
        <button
            className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
            disabled={pending}
        >
            {pending ? pendingLabel : children}
        </button>
    );
}

export default SubmitButton;
