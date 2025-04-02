import {View, type ViewProps} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Styles} from "@/constants/Styles";

export function SafeContainer({style, ...otherProps}: ViewProps) {
    return <SafeAreaView style={Styles.hw100}>
        <View style={style} {...otherProps}/>
    </SafeAreaView>;
}
