import {View, type ViewProps} from 'react-native';
import {Styles} from "@/constants/Styles";

export function VFull({style, ...otherProps}: ViewProps) {
    return <View style={[Styles.hw100, style]} {...otherProps}/>;
}
