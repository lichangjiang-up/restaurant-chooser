import {Styles, VSP} from "@/constants/Styles";
import {PlatformPressable} from "@react-navigation/elements";
import {Text, StyleSheet, View, ActivityIndicator} from 'react-native';
import {Colors} from "@/constants/Colors";

export default function MyBtn({label, style, onPress, disabled, backgroundColor, isSmall, isLoading}: {
    label: string,
    style?: VSP,
    onPress: () => void,
    disabled?: boolean,
    backgroundColor?: string,
    isSmall?: boolean,
    isLoading?: boolean,
}) {
    let aInd = <></>;
    if (isLoading) {
        aInd = <ActivityIndicator color='gray'/>;
    }
    return <View style={[style || Styles.m15, {borderRadius: 10, overflow: "hidden"}]}>
        <PlatformPressable
            android_ripple={disabled ? {color: 'transparent'} : undefined}
            disabled={disabled}
            onPress={onPress}
            style={[isSmall ? styles.btnSmall : styles.btnNormal, styles.btnContainer, {backgroundColor: disabled ? Colors.colorBBB : (backgroundColor || 'gray')}]}>
            {aInd}
            <Text style={[Styles.lh26, {color: 'white'}]}>{label}</Text>
        </PlatformPressable>
    </View>
}

const styles = StyleSheet.create({
    btnContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        elevation: 0,
        gap: 10
    },
    btnSmall: {
        paddingHorizontal: 14,
        paddingVertical: 8,
    },
    btnNormal: {
        paddingHorizontal: 22,
        paddingVertical: 11,
    }
})