import {RecordMap, toRecord} from "@/store/state";
import {StoreApi, UseBoundStore} from "zustand";
import {Text, Pressable, StyleSheet} from "react-native";
import {Styles} from "@/constants/Styles";
import {MaterialIcons} from "@expo/vector-icons";

const checkIcons = ['check-box-outline-blank', 'check-box', 'radio-button-unchecked', 'radio-button-checked'] as const;

type MyCheckboxProps = {
    minHeight?: number,
    store: UseBoundStore<StoreApi<RecordMap<string, null>>>,
    choice: string,
    label: string,
    isSingle?: boolean,
    cb?: (v: boolean) => void,
};

export default function MyCheckbox({minHeight = 56, store, choice, label, isSingle, cb}: MyCheckboxProps) {
    const {record: choices, addRecord, deleteRecord, resetRecord} = store();
    const value = choices.hasOwnProperty(choice);
    const name = checkIcons[(isSingle ? 2 : 0) + (value ? 1 : 0)];
    return <Pressable onPress={() => {
        if (isSingle) {
            resetRecord(toRecord(choice, null));
            cb?.(true);
            return;
        }
        if (!value) {
            addRecord(choice, null);
        } else {
            deleteRecord(choice);
        }
        cb?.(!value);
    }} style={[Styles.w100, styles.container, {minHeight}]}>
        <MaterialIcons name={name} size={30} style={{marginEnd: 6}}
                       color={value ? 'black' : 'gray'}/>
        <Text style={[{lineHeight: 24}, Styles.flex1]}>{label}</Text>
    </Pressable>
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    }
});