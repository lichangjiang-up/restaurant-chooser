import {Styles} from "@/constants/Styles";
import {TextInput, Text, StyleSheet, TextInputProps, View} from "react-native";
import {Colors} from "react-native-ui-lib";

export default function MyTextInput({label, errMsg, ...props}: {
    label: string,
    errMsg: string | false | undefined;
} & TextInputProps) {
    let errorView = <></>;
    if (errMsg) {
        errorView = <Text style={{color: 'red'}}>{errMsg}</Text>;
    }
    return <View style={[Styles.w100, Styles.mb20]}>
        <Text style={Styles.capital}>{label}</Text>
        <TextInput
            placeholderTextColor='gray'
            style={[styles.tf, errMsg ? {borderColor: 'red'} : {}]}
            {...props}
        />
        {errorView}
    </View>
}

const styles = StyleSheet.create({
    tf: {
        height: 46,
        marginTop: 4,
        marginBottom: 2,
        borderWidth: 1,
        padding: 10,
        borderRadius: 4,
        fontSize: 16,
        color: Colors.$textDefault,
        fontWeight: 'normal',
    }
})
