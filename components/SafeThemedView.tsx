import {type ViewProps} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Colors} from "react-native-ui-lib";

export type ThemedViewProps = ViewProps & {
    lightColor?: string;
    darkColor?: string;
};

export function SafeThemedView({style, ...otherProps}: ThemedViewProps) {
    return <SafeAreaView style={[{backgroundColor: Colors.$backgroundDefault}, style]} {...otherProps} />;
}
