import { Colors, Toast, ToastPresets } from "react-native-ui-lib";
import { createContext, useEffect, useState } from "react";
import { Styles } from "@/constants/Styles";

type ToastTyp = ToastPresets | 'loader';

export const ToastContext = createContext({
    showToast(message: string, preset?: ToastTyp) {
    },
});

let timeoutId: NodeJS.Timeout | null = null;

function gClearTimeout() {
    if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
    }
}

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {

    const [toast, setToast] = useState({
        message: '',
        showLoader: false,
        backgroundColor: Colors.$backgroundPrimaryHeavy,
        visible: false,
    });

    const showToast = (message: string, typ?: ToastTyp) => {
        const isLoading = typ === 'loader';

        const BG_MAP: Record<ToastTyp, string> = {
            [ToastPresets.FAILURE]: Colors.$backgroundDangerHeavy,
            [ToastPresets.SUCCESS]: Colors.$backgroundSuccessHeavy,
            [ToastPresets.OFFLINE]: Colors.$backgroundNeutralHeavy,
            [ToastPresets.GENERAL]: Colors.$backgroundPrimaryHeavy,
            loader: Colors.$backgroundPrimaryHeavy,
        };

        const newToast = {
            message,
            backgroundColor: BG_MAP[typ || ToastPresets.SUCCESS],
            showLoader: isLoading,
            visible: true,
        };
        setToast(newToast);
        gClearTimeout();
        timeoutId = setTimeout(() => setToast({ ...newToast, visible: false }), isLoading ? 30000 : 1500);
    };

    useEffect(() => {
        return () => {
            gClearTimeout();
        };
    }, []);

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <Toast {...toast}
                position='top'
                style={Styles.toastMt30}
                centerMessage />
        </ToastContext.Provider>
    );
};
