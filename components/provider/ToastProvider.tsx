import {Toast, ToastPresets} from "react-native-ui-lib";
import {createContext, useState} from "react";

type ToastTyp = ToastPresets | 'loader';

export const ToastContext = createContext({
    showToast(message: string, preset?: ToastTyp) {
    },
    hideToast(dur = 3000) {
    }
});

let timeoutId: NodeJS.Timeout;

function gClearTimeout() {
    timeoutId && clearTimeout(timeoutId);
}

export const ToastProvider = ({children}: { children: React.ReactNode }) => {

    const [toast, setToast] = useState({
        message: '',
        showLoader: false,
        preset: ToastPresets.SUCCESS,
        visible: false,
    });

    const showToast = (message: string, typ?: ToastTyp) => {
        const isLoading = typ === 'loader';
        hideToast(isLoading ? 30000 : 3000);
        setToast({
            message,
            preset: isLoading ? ToastPresets.OFFLINE : (typ || ToastPresets.SUCCESS),
            showLoader: isLoading,
            visible: true,
        });
    };

    function hideToast(dur = 3000) {
        gClearTimeout();
        timeoutId = setTimeout(() => {
            setToast({
                ...toast,
                visible: false,
            });
        }, dur);
    }

    return (
        <ToastContext.Provider value={{showToast, hideToast}}>
            {children}
            <Toast {...toast}
                   centerMessage/>
        </ToastContext.Provider>
    );
};
