import {Styles} from "@/constants/Styles";
import {ScrollView, StyleSheet} from "react-native";
import {useContext} from "react";
import {Button, ButtonSize, Colors, Picker, TextField, ToastPresets} from "react-native-ui-lib";
import {router} from "expo-router";
import {ToastContext} from "@/components/provider/ToastProvider";
import {SafeContainer} from "@/components/SafeContainer";
import {Person, statePeople, statePerson, StorageTyp} from "@/store/store";
import {initLastModifiedAndRet} from "@/store/storage";
import {newValueLabel, ValueLabel} from "@/components/ui/PikerView";

export default function UpsertPersonScreen() {
    const person = statePerson((state) => state.v);
    const marker = statePerson((state) => state.marker);
    const personState = statePerson.getState();

    const styles = getStyles();

    function getTextField(key: keyof Person, name: string, maxLength = 30) {
        return <TextField
            key={key}
            multiline={maxLength > 30}
            placeholder={`Input with person ${name.toLocaleLowerCase()}`}
            label={name}
            maxLength={maxLength}
            validateOnBlur={true}
            color={Colors.$textDefault}
            containerStyle={[Styles.mb20, styles.tfContainer]}
            value={person[key] as any}
            style={styles.tf}
            onChangeText={(text) => personState.update(key, text)}/>;
    }

    function getPicker(key: keyof Person, name: string, valueLabel: ValueLabel[]) {
        return <Picker
            key={key}
            style={[styles.picker, Styles.mb20]}
            value={person[key] as any}
            label={name}
            placeholder={`Select ${name.toLocaleLowerCase()}`}
            onChange={(text) => personState.update(key, text)}>
            {valueLabel.map(({value, label}) => <Picker.Item
                labelStyle={{lineHeight: 40}}
                key={value}
                label={label}
                value={value}/>)}
        </Picker>;
    }

    const {showToast} = useContext(ToastContext);

    function onSavePress() {
        if (!(person.name && person.relation)) {
            showToast('Name/Relation must not empty', ToastPresets.FAILURE);
            return;
        }
        statePerson.getState().resetMarker(true);
        showToast('Person saving...', 'loader');
        setTimeout(() => {
            try {
                const res = personState.merge(initLastModifiedAndRet(person, StorageTyp.PERSON));
                statePeople.getState().add(res.key, res);
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
        <SafeContainer style={Styles.hw100}>
            <ScrollView contentContainerStyle={Styles.p10}>
                {getTextField('name', 'Name')}
                {getTextField('phone', 'Phone number', 16)}
                {getPicker('gender', 'Gender', ['-', 'Male', 'Female'].map(newValueLabel))}
                {getPicker('relation', 'Relation', ['Other', 'Me', 'Family'].map(newValueLabel))}
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
        </SafeContainer>
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

