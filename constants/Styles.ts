import {StyleProp, StyleSheet, TextStyle, ViewStyle} from "react-native";
import {Colors} from "react-native-ui-lib";

export const Styles = StyleSheet.create({
    cContainer: {justifyContent: 'center', alignItems: 'center', height: '100%', padding: 20},
    container: {
        padding: 15,
        height: '100%',
    },
    containerPh: {
        paddingHorizontal: 15,
        height: '100%',
    },
    dNone: {
        display: 'none',
    },
    flexG1: {
        flexGrow: 1,
    },
    p0: {
        padding: 0,
    },
    p10: {
        padding: 10,
    },
    hw100: {
        height: '100%',
        width: '100%',
    },
    mb20: {
        marginBottom: 20,
    },
    lh30: {
        lineHeight: 30
    },
    link: {
        marginTop: 15,
        paddingVertical: 15,
    },
});

export function getStyleBg() {
    return {backgroundColor: Colors.$backgroundDefault}
}

export type VSP = StyleProp<ViewStyle>
export type VST = StyleProp<TextStyle>