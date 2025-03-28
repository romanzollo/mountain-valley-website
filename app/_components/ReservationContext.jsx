'use client';

import { createContext, useContext, useState } from 'react';

// создаем контекст
const ReservationContext = createContext();

// инициализируем состояние
const initialState = { from: undefined, to: undefined };

// создаем компонент провайдера контекста
function ReservationProvider({ children }) {
    // создаем состояние выбранных дат
    const [range, setRange] = useState(initialState);

    // функция для сброса дат
    const resetRange = () => setRange(initialState);

    return (
        <ReservationContext.Provider value={{ range, setRange, resetRange }}>
            {children}
        </ReservationContext.Provider>
    );
}

// создаем свой хук для доступа к контексту
function useReservation() {
    const context = useContext(ReservationContext);

    if (!context) throw new Error('Context was used outside of provider');

    return context;
}

// экспортируем провайдер и хук
export { ReservationProvider, useReservation };
