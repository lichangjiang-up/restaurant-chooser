import {Colors, Picker, PickerProps} from "react-native-ui-lib";
import {Styles} from "@/constants/Styles";
import {View, Text, StyleSheet} from "react-native";

export type ValueLabel = {
    value: string;
    label: string;
}

export function newValueLabel<T>(vals: readonly T[]): ValueLabel[] {
    return vals.map(value => ({value, label: value} as ValueLabel));
}

export default function MyPiker({valueLabels, keyName, errMsg, ...props}: {
    valueLabels: ValueLabel[],
    keyName: string
    errMsg: string | false | undefined,
} & PickerProps) {
    let errorView = <></>;
    if (errMsg) {
        errorView = <Text style={{color: 'red'}}>{errMsg}</Text>;
    }
    return <View style={Styles.mb20}>
        <Picker
            style={[styles.picker, errMsg ? {borderColor: 'red'} : {}]}
            label={keyName}
            enableModalBlur={true}
            useSafeArea={true}
            labelStyle={Styles.capital}
            placeholder={`Select ${keyName}`}
            placeholderTextColor='gray'

            customPickerProps={{
                useDialog: true,
                dialogProps: {
                    bottom: true,
                    containerStyle: {
                        marginBottom: 0,
                        width: '100%',
                        borderBottomRightRadius: 0,
                        borderBottomLeftRadius: 0
                    }
                }
            }}
            {...props}>
            {valueLabels.map(({value, label}) => <Picker.Item
                labelStyle={Styles.lh40}
                key={value}
                label={label}
                value={value}/>)}
        </Picker>
        {errorView}
    </View>
}

const styles = StyleSheet.create({
    picker: {
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: 'solid',
        paddingVertical: 6,
        paddingHorizontal: 10,
        lineHeight: 46,
        marginVertical: 2,
        fontSize: 16,
        color: Colors.$textDefault,
        fontWeight: 'normal',
    }
})