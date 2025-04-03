import { RecordMap } from "@/store/state";
import { Checkbox, CheckboxProps } from "react-native-ui-lib";
import { StoreApi, UseBoundStore } from "zustand";

export default function MyCheckbox({ lineHeight = 56, store, choice: key, ...otherProps }: CheckboxProps & {
    lineHeight?: number, store: UseBoundStore<StoreApi<RecordMap<null>>>, choice: string
}) {
    const choices = store(state => state.record);
    return <Checkbox
        labelStyle={{ lineHeight, width: '100%' }}
        value={choices.hasOwnProperty(key)}
        onValueChange={(v) => {
            const state = store.getState();
            if (!v) {
                state.deleteRecord(key);
            } else {
                state.addRecord(key, null);
            }
        }}
        {...otherProps}
    />
}