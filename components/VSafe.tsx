import {type ViewProps} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Styles} from "@/constants/Styles";

export function VSafe({style, ...otherProps}: ViewProps) {
    return <SafeAreaView style={[Styles.hw100, style]} {...otherProps}/>;
}
