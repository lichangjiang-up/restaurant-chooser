import {create} from "zustand/react";
import {newRecordStore} from "@/store/state";

type DialogStore = {
    remainingRestaurant: number,
    setRemainingRestaurant: (remainingRestaurant: number) => void,
    show: boolean;
    modalShowOrHide: (v?: boolean) => void;
    vetoShow: boolean;
    vetoShowHide: (v?: boolean) => void;
};

export const dialogStore = create<DialogStore>()((set) => ({
    show: false,
    vetoShow: false,
    remainingRestaurant: 0,
    modalShowOrHide: (show) => set(state => {
        const res = {...state, show: !!show};
        if (!res.show) {
            res.vetoShow = false;
        }
        return res;
    }),
    vetoShowHide: (v) => set(state => ({...state, vetoShow: !!v})),
    setRemainingRestaurant: (remaining: number) => set(state => ({...state, remainingRestaurant: remaining})),
}));

export const vetoedRecordStore = newRecordStore<string, null>();