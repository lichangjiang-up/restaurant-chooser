import {StyleProp, StyleSheet, TextStyle, ViewStyle} from "react-native";

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
    m0: {
        margin: 0,
    },
    flexG1: {
        flexGrow: 1,
    },
    pv5: {
        paddingVertical: 5,
    },
    p0: {
        padding: 0,
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
    btn: {
        height: 48,
        color: 'white',
        borderRadius: 16,
    }
});

export function getStyleBg() {
    return {backgroundColor: 'white'}
}

export type VSP = StyleProp<ViewStyle>
export type VST = StyleProp<TextStyle>