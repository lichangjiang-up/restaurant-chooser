import {Styles} from "@/constants/Styles";
import {FlatList, Pressable, StyleSheet, Text, View} from "react-native";
import {useState} from "react";
import MyModal from "@/components/ui/MyModal";
import MyCheckbox from "@/components/ui/MyCheckbox";
import {newRecordInit, toRecord} from "@/store/state";
import {ErrMsg} from "@/constants/method";
import {Colors} from "@/constants/Colors";
import MyBtn from "@/components/ui/MyBtn";

export type ValueLabel = {
    value: string;
    label: string;
}

type PickerValue = string | string[] | undefined;

export function newValueLabel<T>(vals: readonly T[]): ValueLabel[] {
    return vals.map(value => ({value, label: value} as ValueLabel));
}

export default function MyPiker({onChange, value, valueLabels, keyName, errMsg, isMulti}: {
    valueLabels: ValueLabel[],
    keyName: string
    errMsg?: ErrMsg,
    isMulti?: boolean,
    value: PickerValue,
    onChange: (v: PickerValue) => void,
}) {
    let errorView = <></>;
    if (errMsg) {
        errorView = <Text style={{color: 'red'}}>{errMsg}</Text>;
    }
    const [visible, setVisible] = useState(false);
    const checkStore = newRecordInit<string, null>(toRecord(value, null));

    if (typeof value !== 'string') {
        value = value?.join(', ') || '';
    }

    function changeAndHide(v: PickerValue) {
        onChange(v);
        setVisible(false);
    }

    let actionsView = <></>;
    if (isMulti) {
        actionsView =
            <View style={[Styles.rowBtw, Styles.gap20, {marginTop: 10}]}>
                <MyBtn style={Styles.flex1} backgroundColor={Colors.colorAAA} isSmall label='Cancel'
                       onPress={() => setVisible(false)}/>
                <MyBtn style={Styles.flex1} isSmall label='Save'
                       onPress={() => changeAndHide(Object.keys(checkStore.getState().record))}/>
            </View>;
    }

    function renderItem({item}: { item: ValueLabel }) {
        const {label, value} = item;
        return <MyCheckbox
            isSingle={!isMulti}
            lineHeight={48}
            key={value}
            label={label}
            cb={isMulti ? undefined : (_) => changeAndHide(label)}
            store={checkStore}
            choice={value}/>
    }

    return <Pressable style={Styles.w100} onPress={() => setVisible(true)}>
        <Text style={Styles.capital}>
            {keyName}
        </Text>
        <Text
            style={[styles.picker, {color: value ? Colors.textDefault : 'gray'}, {borderColor: errMsg ? 'red' : Colors.textDefault}]}>{value || `Select ${keyName}`}</Text>
        <MyModal visible={visible} onPress={() => setVisible(false)}>
            <FlatList data={valueLabels}
                      keyExtractor={(({label}) => label)}
                      renderItem={renderItem}/>
            {actionsView}
        </MyModal>
        {errorView}
    </Pressable>
}

const styles = StyleSheet.create({
    picker: {
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: 'solid',
        paddingHorizontal: 10,
        lineHeight: 46,
        marginTop: 4,
        marginBottom: 2,
        fontSize: 16,
        fontWeight: 'normal',
    }
})