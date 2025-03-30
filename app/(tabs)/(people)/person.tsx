import {Styles} from "@/constants/Styles";
import {ScrollView, StyleSheet} from "react-native";
import {ReactNode, useContext} from "react";
import {Button, ButtonSize, Colors, Picker, TextField, ToastPresets} from "react-native-ui-lib";
import {Validator} from "react-native-ui-lib/src/components/textField/types";
import {router} from "expo-router";
import {ToastContext} from "@/components/provider/ToastProvider";
import {SafeThemedView} from "@/components/SafeThemedView";
import {Person, statePeople, statePerson} from "@/store/store";


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
    const person = statePerson((state) => state.v);
    const marker = statePerson((state) => state.marker);
    const personState = statePerson.getState();

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
            value={person[key] as any}
            style={styles.tf}
            onChangeText={(text) => personState.update(key, text)}/>;
    }

    function getPicker(key: keyof Person, name: string, children: ReactNode[], validate: Validator | Validator[]) {
        return <Picker
            key={key}
            style={[styles.picker, Styles.mb20]}
            value={person[key] as any}
            validate={validate}
            label={name}
            placeholder={`Select ${name.toLocaleLowerCase()}`}
            onChange={(text) => personState.update(key, text)}>
            {children}
        </Picker>;
    }

    const {showToast} = useContext(ToastContext);

    function onSavePress() {
        if (!person.name) {
            showToast('Person name must not empty', ToastPresets.FAILURE);
            return;
        }
        if (!person.phone) {
            showToast('Person phone must not empty', ToastPresets.FAILURE);
            return;
        }
        statePerson.getState().resetMarker(true);
        showToast('Person saving...', 'loader');
        setTimeout(() => {
            person.key ||= `p${person.initLastModifiedAndRet()}`;
            try {
                statePeople.getState().add(person.key, person);
                showToast('Person saved');
                router.back();
            } catch (err) {
                showToast('Person save failed', ToastPresets.FAILURE);
                console.log(err);
            } finally {
                statePerson.getState().resetMarker();
            }
        }, 500);
    }

    return (
        <SafeThemedView style={Styles.hw100}>
            <ScrollView contentContainerStyle={Styles.p10}>
                {getTextField('name', 'Name', g6Len, vMsg)}
                {getTextField('phone', 'Phone number', g6Len, vMsg, 16)}
                {getPicker('gender', 'Gender', genderList, ['required'])}
                {getPicker('relation', 'Relation', personTypList, ['required'])}
                <Button
                    disabled={marker}
                    label={marker ? 'Saving...' : 'Save Person'}
                    backgroundColor={Colors.$backgroundNeutralHeavy}
                    borderRadius={14}
                    size={ButtonSize.large}
                    labelStyle={Styles.lh30}
                    onPress={onSavePress}
                    color={Colors.$white}
                />
            </ScrollView>
        </SafeThemedView>
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

