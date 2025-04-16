import * as Haptics from 'expo-haptics';
import {Styles} from "@/constants/Styles";
import {Props} from '@react-navigation/elements/lib/typescript/src/PlatformPressable';
import {PlatformPressable} from "@react-navigation/elements";

export function HapticPressable(props: Props) {
    return (
        <PlatformPressable
            {...props}
            style={[Styles.center, Styles.flex1]}
            accessibilityRole="button"
            android_ripple={{color: 'transparent'}}
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
