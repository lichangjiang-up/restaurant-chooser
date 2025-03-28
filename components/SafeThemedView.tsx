import {type ViewProps} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {getStyleBg} from "@/constants/Styles";

export function SafeThemedView({style, ...otherProps}: ViewProps) {
    return <SafeAreaView style={[getStyleBg(), style]} {...otherProps} />;
}
