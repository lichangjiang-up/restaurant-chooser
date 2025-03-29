import {Styles} from "@/constants/Styles";
import {ScrollView, StyleSheet} from "react-native";
import {ReactNode, useContext, useState} from "react";
import {Button, ButtonSize, Colors, Picker, TextField, ToastPresets} from "react-native-ui-lib";
import {Validator} from "react-native-ui-lib/src/components/textField/types";
import {ThemedView} from "@/components/ThemedView";
import {PEOPLE_STORAGE, Person, storageListByTyp} from "@/constants/Storage";
import {router} from "expo-router";
import {ToastContext} from "@/components/provider/ToastProvider";
import {USW} from "@/constants/UseStateWrapper";


const g6Len: Validator[] = (['required', (value?: string) => (value ?? '').length > 6]);
const vMsg = ['is required', 'is too short']
const genderList = ['-', 'Male', 'Female'].map(g => <Picker.Item
    labelStyle={{lineHeight: 40}}
    key={g}
    label={g}
    value={g}/>);

const personTypList = ['Other', 'Me', 'Family'].map(g => <Picker.Item
    labelStyle={{lineHeight: 40}}
    key={g}
    label={g}
    value={g}/>);


export default function UpsertPersonScreen() {
    const [usw, setUsw] = useState(new USW(new Person()));
    const formData = usw.v;

    function updateFormData(key: keyof Person, value: any) {
        setUsw(usw.renewObj({[key]: value}))
    }

    const styles = getStyles();

    function getTextField(key: keyof Person, name: string, validate: Validator | Validator[], validationMessage: string[], maxLength = 30) {
        return <TextField
            key={key}
            multiline={maxLength > 30}
            placeholder={`Input with person ${name.toLocaleLowerCase()}`}
            label={name}
            maxLength={maxLength}
            validate={validate}
            validationMessage={validationMessage.map(m => `${name} ${m}`)}
            validateOnBlur={true}
            color={Colors.$textDefault}
            containerStyle={[Styles.mb20, styles.tfContainer]}
            value={formData[key] as any}
            style={styles.tf}
            onChangeText={(text) => updateFormData(key, text)}/>;
    }

    function getPicker(key: keyof Person, name: string, children: ReactNode[], validate: Validator | Validator[]) {
        return <Picker
            key={key}
            style={[styles.picker, Styles.mb20]}
            value={formData[key] as any}
            validate={validate}
            label={name}
            placeholder={`Select ${name.toLocaleLowerCase()}`}
            onChange={(text) => updateFormData(key, text)}>
            {children}
        </Picker>;
    }

    const {showToast} = useContext(ToastContext);

    function onSavePress() {
        if (!formData.name) {
            showToast('Person name must not empty', ToastPresets.FAILURE);
            return;
        }
        if (!formData.phone) {
            showToast('Person phone must not empty', ToastPresets.FAILURE);
            return;
        }
        setUsw(usw.renewMarked(true))
        showToast('Person saving...', 'loader');
        setTimeout(() => {
            formData.key ||= `r${formData.initLastModifiedAndRet()}`;
            try {
                storageListByTyp(PEOPLE_STORAGE, formData.key, formData);
                showToast('Person saved');
                router.back();
            } catch (err) {
                showToast('Person save failed', ToastPresets.FAILURE);
                console.log(err);
            } finally {
                setUsw(usw.renewMarked());
            }
        }, 500);
    }


    return (
        <ThemedView style={Styles.hw100}>
            <ScrollView contentContainerStyle={Styles.p10}>
                {getTextField('name', 'Name', g6Len, vMsg)}
                {getTextField('phone', 'Phone number', g6Len, vMsg, 16)}
                {getPicker('gender', 'Gender', genderList, ['required'])}
                {getPicker('relation', 'Relation', personTypList, ['required'])}
                <Button
                    disabled={usw.marked}
                    label={usw.marked ? 'Saving...' : 'Save Person'}
                    backgroundColor={Colors.$backgroundNeutralHeavy}
                    borderRadius={14}
                    size={ButtonSize.large}
                    labelStyle={Styles.lh30}
                    onPress={onSavePress}
                    color={Colors.$white}
                />
            </ScrollView>
        </ThemedView>
    );
}

function getStyles() {
    return StyleSheet.create({
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
    })
}

