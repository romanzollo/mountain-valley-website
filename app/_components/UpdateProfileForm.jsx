'use client';

import { useState } from 'react';

import SubmitButton from '@/app/_components/SubmitButton';
import worldFlag from '@/public/world-flag.svg'; // Импортируем файл

import { updateGuest } from '@/app/_lib/actions';

function UpdateProfileForm({ guest, children }) {
    const [count, setCount] = useState();

    // достаем нужные нам данные гостя
    const { fullName, email, nationality, nationalID, countryFlag } = guest;

    const flagSrc = countryFlag || worldFlag.src; // Если countryFlag отсутствует, используем worldFlag

    return (
        <form
            // используем server action который будет автоматически отправлять все данные из формы в action через formdata API
            action={updateGuest}
            className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
        >
            <div className="space-y-2">
                <label>Full name</label>
                <input
                    // запрещаем изменение имени
                    disabled
                    // заполняем поле данными гостя
                    defaultValue={fullName}
                    // добавляем name в инпут чтобы отправлять его в action
                    name="fullName"
                    className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
                />
            </div>

            <div className="space-y-2">
                <label>Email address</label>
                <input
                    // запрещаем изменение email
                    disabled
                    // заполняем поле данными гостя
                    defaultValue={email}
                    // добавляем name в инпут чтобы отправлять его в action
                    name="email"
                    className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
                />
            </div>

            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <label htmlFor="nationality">Where are you from?</label>
                    <img
                        src={flagSrc}
                        alt={
                            countryFlag ? 'Country flag' : 'Default world flag'
                        }
                        className="h-5 rounded-sm"
                    />
                </div>

                {/* серверный компонент SelectCountry переданный в UpdateProfileForm в виде children */}
                {children}
            </div>

            <div className="space-y-2">
                <label htmlFor="nationalID">National ID number</label>
                <input
                    defaultValue={nationalID}
                    name="nationalID"
                    className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm focus:rounded-sm focus:bg-primary-800
                            focus:text-primary-200"
                />
            </div>

            <div className="flex justify-end items-center gap-6">
                <SubmitButton pendingLabel="Updating...">
                    Update profile
                </SubmitButton>
            </div>
        </form>
    );
}

export default UpdateProfileForm;
