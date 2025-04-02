import {PlatformPressable} from '@react-navigation/elements';
import * as Haptics from 'expo-haptics';
import {Props} from "@react-navigation/elements/lib/typescript/commonjs/src/PlatformPressable";
import {Styles} from "@/constants/Styles";

export function HapticPressable(props: Props) {
    return (
        <PlatformPressable
            {...props}
            style={Styles.center}
            android_ripple={{color: '#CCCCCC88'}}
            onPressIn={(ev) => {
                if (process.env.EXPO_OS === 'ios') {
                    // Add a soft haptic feedback when pressing down on the tabs.
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                }
                props.onPressIn?.(ev);
            }}
        />
    );
}
