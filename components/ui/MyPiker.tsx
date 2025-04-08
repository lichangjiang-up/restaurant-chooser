import {Picker, PickerProps} from "react-native-ui-lib";
import {Styles} from "@/constants/Styles";

export type ValueLabel = {
    value: string;
    label: string;
}

export function newValueLabel<T>(vals: readonly T[]): ValueLabel[] {
    return vals.map(value => ({value, label: value} as ValueLabel));
}

export default function MyPiker({valueLabels, keyName, ...props}: {
    valueLabels: ValueLabel[],
    keyName: string
} & PickerProps) {
    const pStyle = props.style;
    delete props.style;
    return <Picker
        style={[Styles.picker, Styles.mb20, pStyle]}
        label={keyName}
        enableModalBlur={true}
        useSafeArea={true}
        labelStyle={Styles.capital}
        placeholder={`Select ${keyName}`}
        customPickerProps={{
            useDialog: true,
            dialogProps: {bottom: true, containerStyle: {marginBottom: 0, width: '100%'}}
        }}
        {...props}>
        {valueLabels.map(({value, label}) => <Picker.Item
            labelStyle={Styles.lh40}
            key={value}
            label={label}
            value={value}/>)}
    </Picker>
}