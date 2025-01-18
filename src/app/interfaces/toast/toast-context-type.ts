import {typeToast} from "@/app/provider/toast.provider";

export interface ToastContextType {
    show: (title: string, message: string, type: typeToast) => void;
}