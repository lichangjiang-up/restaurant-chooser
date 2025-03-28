import {View} from "react-native-ui-lib";
import {ViewProps} from "react-native";
import {getStyleBg} from "@/constants/Styles";

export function ThemedView({style, ...otherProps}: ViewProps) {
    return <View style={[getStyleBg(), style]} {...otherProps} />;
}
