import {Platform, StyleProp, StyleSheet, TextStyle, ViewStyle} from "react-native";
import {Colors} from "react-native-ui-lib";

export const Styles = StyleSheet.create({
    cContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        padding: 20
    },
    m0: {
        margin: 0,
    },
    flexG1: {
        flexGrow: 1,
    },
    pv5: {
        paddingVertical: 5,
    },
    p10: {
        padding: 10,
    },
    p10_8: {
        paddingVertical: 10,
        paddingHorizontal: 8,
    },
    ph5: {
        paddingHorizontal: 5,
    },
    ph15: {
        paddingHorizontal: 15,
    },
    m15: {
        margin: 15,
    },
    w100: {
        width: '100%',
    },
    hw100: {
        height: '100%',
        width: '100%',
    },
    mb20: {
        marginBottom: 20,
    },
    lh26: {
        lineHeight: 25
    },
    lh40: {
        lineHeight: 40
    },
    link: {
        marginTop: 15,
        paddingVertical: 15,
    },
    center: {
        flexGrow: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 28,
        lineHeight: 36,
        marginVertical: 22,
    },
    borderBottom: {
        borderColor: '#AAAAAA44',
        borderBottomWidth: 1,
        borderStyle: 'solid',
    },
    rowBtw: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexGrow: 1,
    },
    label: {
        fontWeight: 500,
        lineHeight: 24,
    },
    itemText: {flex: 1, fontWeight: '500', color: 'black', fontSize: 16, textAlign: 'left'},
    wFullMb20: {
        width: '100%',
        marginBottom: 20,
    },
    input: {
        height: 46,
        marginVertical: 12,
        borderWidth: 1,
        padding: 10,
    },
    mv20: {
        marginVertical: 20,
    },
    toastMt30: Platform.select({
        android: {paddingTop: 30},
        ios: {paddingTop: 30},
        default: {},
    }),
    capital: {
        textTransform: 'capitalize',
    },
    picker: {
        borderRadius: 4,
        borderWidth: 1,
        borderColor: Colors.$textDefault,
        borderStyle: 'solid',
        paddingVertical: 6,
        paddingHorizontal: 10,
        lineHeight: 46,
        marginTop: 4,
    },
    tfContainer: {
        borderStyle: 'solid',
        borderBottomWidth: 1,
        paddingBottom: 4,
        borderColor: Colors.$textDefault,
    },
    tf: {lineHeight: 24, fontSize: 18, marginVertical: 6}
});

export function getStyleBg() {
    return {backgroundColor: 'white'}
}

export type VSP = StyleProp<ViewStyle>
export type VST = StyleProp<TextStyle>