import {typeToast} from "@/app/provider/toastProvider";

export interface ToastContextType {
    show: (title: string, message: string, type: typeToast) => void;
}