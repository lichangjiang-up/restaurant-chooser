import {Colors, Toast} from "react-native-ui-lib";
import {createContext, useState} from "react";

export type ToastTyp = ('success' | 'error' | 'loader');

export const ToastContext = createContext({
    showToast(message: string, type?: ToastTyp) {
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
        bg: Colors.$textSuccess,
        visible: false,
    });

    const showToast = (message: string, typ?: ToastTyp) => {
        hideToast(typ === 'loader' ? 30000 : 3000);
        setToast({
            message,
            bg: {
                'error': Colors.$textDanger,
                'success': Colors.$textSuccess,
                'loader': Colors.$textWarning,
            }[typ || 'success'],
            showLoader: typ === 'loader',
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
            <Toast message={toast.message}
                   centerMessage
                   showLoader={toast.showLoader}
                   backgroundColor={toast.bg}
                   visible={toast.visible}/>
        </ToastContext.Provider>
    );
};
