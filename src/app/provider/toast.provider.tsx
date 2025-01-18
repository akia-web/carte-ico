"use client";

import React, {Context, createContext, MutableRefObject, ReactNode, useRef} from 'react';

import {Toast} from 'primereact/toast';
import { ToastContextType } from '../interfaces/toast/toast-context-type';

export type typeToast = "success" | "info" | "warn" | "error" | "secondary" | "contrast" | undefined

export const ToastContext: Context<ToastContextType> = createContext<ToastContextType>({
    show: (): void => {
    },
});

export const ToastProvider = ({children}: { children: ReactNode }) => {
    const toast: MutableRefObject<Toast | null> = useRef<Toast | null>(null);

    const show = (title: string, message: string, type: typeToast): void => {

        if (toast.current) {
            toast.current.show({severity: type, summary: title, detail: message});
        }
    };

    return (
        <ToastContext.Provider value={{show}}>
            <Toast ref={toast}></Toast>
            {children}
        </ToastContext.Provider>
    );
};