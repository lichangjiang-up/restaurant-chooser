import {PlatformPressable} from '@react-navigation/elements';
import * as Haptics from 'expo-haptics';
import {Styles} from "@/constants/Styles";
import { Props } from '@react-navigation/elements/lib/typescript/src/PlatformPressable';

export function HapticPressable(props: Props) {
    return (
        <PlatformPressable
            {...props}
            style={[Styles.center, Styles.flexG1]}
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
