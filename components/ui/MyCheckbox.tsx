import { StorageMap } from "@/store/state";
import { Checkbox, CheckboxProps } from "react-native-ui-lib";

export default function MyCheckbox({ lineHeight = 56, choices, state, key, ...otherProps }: CheckboxProps & {
    lineHeight?: number, choices: Record<string, any>, state: StorageMap<null>, key: string
}) {

    return <Checkbox
        key={key}
        labelStyle={{ lineHeight, width: '100%' }}
        value={state.record.hasOwnProperty(key)}
        onValueChange={(v) => {
            if (!v) {
                state.deleteRecord(key);
            } else {
                state.addRecord(key, null);
            }
        }}
        {...otherProps}
    />
}