import {Colors, Toast, ToastPresets} from "react-native-ui-lib";
import {createContext, useState} from "react";
import {Platform} from "react-native";

type ToastTyp = ToastPresets | 'loader';

export const ToastContext = createContext({
    showToast(message: string, preset?: ToastTyp) {
    },
});

let timeoutId: NodeJS.Timeout;

function gClearTimeout() {
    timeoutId && clearTimeout(timeoutId);
}

export const ToastProvider = ({children}: { children: React.ReactNode }) => {

    const [toast, setToast] = useState({
        message: '',
        showLoader: false,
        backgroundColor: Colors.$backgroundPrimaryHeavy,
        visible: false,
    });

    const showToast = (message: string, typ?: ToastTyp) => {
        const isLoading = typ === 'loader';

        const BG_MAP = {
            [ToastPresets.FAILURE]: Colors.$backgroundDangerHeavy,
            [ToastPresets.SUCCESS]: Colors.$backgroundSuccessHeavy,
            [ToastPresets.OFFLINE]: Colors.$backgroundNeutralHeavy,
            [ToastPresets.GENERAL]: Colors.$backgroundPrimaryHeavy,
        };

        const newToast = {
            message,
            backgroundColor: BG_MAP[isLoading ? ToastPresets.GENERAL : (typ || ToastPresets.SUCCESS)],
            showLoader: isLoading,
            visible: true,
        };
        setToast(newToast);
        gClearTimeout();
        timeoutId = setTimeout(() => setToast({...newToast, visible: false}), isLoading ? 30000 : 2500);
    };

    return (
        <ToastContext.Provider value={{showToast}}>
            {children}
            <Toast {...toast}
                   position='top'
                   style={Platform.select({
                       android: {paddingTop: 30},
                       ios: {paddingTop: 30},
                   })}
                   centerMessage/>
        </ToastContext.Provider>
    );
};
