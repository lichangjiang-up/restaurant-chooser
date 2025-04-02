import {Modal, Pressable, StyleSheet, Text, View} from "react-native";
import {Styles, VSP} from "@/constants/Styles";
import {useState} from "react";

export type ValueLabel = {
    value: string;
    label: string;
}


export function newValueLabel(value: any) {
    value = value?.toString() || '';
    return {value, label: value}
}


export default function PikerView({style, initValue, valueLabels, onChange}: {
    initValue: string,
    valueLabels: ValueLabel[],
    onChange: (text: string) => void
    style?: VSP,
}) {
    const [show, setShow] = useState(false);

    return <Pressable style={[styles.container, style]} onPress={() => setShow(true)}>
        <Modal animationType="slide"
               transparent={true}
               visible={show}
               onDismiss={() => setShow(false)}>
            <View style={[Styles.hw100, {backgroundColor: 'red'}]}>

            </View>
        </Modal>
        <Text style={styles.text}>{initValue}</Text>
    </Pressable>;
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        height: 48,
        borderBottomWidth: 1,
        borderRadius: 8,
        padding: 12,
    },
    text: {
        fontSize: 18,
    }
});