import {Styles} from "@/constants/Styles";
import {ScrollView, StyleSheet} from "react-native";
import {useContext, useState} from "react";
import {Colors, Picker, TextField, ToastPresets} from "react-native-ui-lib";
import {router} from "expo-router";
import {ToastContext} from "@/components/provider/ToastProvider";
import {VFull} from "@/components/VFull";
import {checkName, checkPhone, createMarkerStore, Person, statePeople, statePerson, StorageTyp} from "@/store/state";
import {initLastModifiedAndRet} from "@/store/storage";
import {newValueLabel, ValueLabel} from "@/components/ui/PikerView";
import LargeBtn from "@/components/ui/LargeBtn";


// type IsErrFunc<K extends keyof Person> = (v?: Person[K]) => string | false;

const markerState = createMarkerStore();

type ErrRecord = Record<keyof Person, string | false | undefined>;

export default function UpsertPersonScreen() {
    const person = statePerson((state) => state.v);
    const {marker, resetMarker} = markerState();
    const personState = statePerson.getState();

    person.gender ||= '-';

    const styles = getStyles();

    const [errors, setErrors] = useState<ErrRecord>({} as ErrRecord);


    function getTextField(key: keyof Person, maxLength = 30) {
        const newErr = errors[key];
        return <TextField
            key={key}
            multiline={maxLength > 30}
            placeholder={`Input with person ${key}`}
            label={newErr || key}
            labelColor={newErr ? 'red' : undefined}
            maxLength={maxLength}
            color={Colors.$textDefault}
            labelStyle={Styles.capital}
            onBlur={() => {
                const v = person[key];
                if (v && typeof v === 'string' && v.trim().length !== v.length) {
                    personState.update(key, v.trim());
                }
            }}
            containerStyle={[Styles.mb20, styles.tfContainer, newErr ? {borderColor: 'red'} : {}]}
            value={person[key] as any}
            style={styles.tf}
            onFocus={() => (delete errors[key]) && setErrors({...errors})}
            onChangeText={(text) => personState.update(key, text)}/>;
    }

    function getPicker(key: keyof Person, valueLabel: ValueLabel[]) {
        const newErr = errors[key];
        return <Picker
            key={key}
            style={[styles.picker, Styles.mb20, newErr ? {borderColor: 'red'} : {}]}
            value={person[key] as any}
            label={newErr || key}
            labelColor={newErr ? 'red' : undefined}
            labelStyle={Styles.capital}
            placeholder={`Select ${key}`}
            onChange={(text) => {
                (delete errors[key]) && setErrors({...errors});
                personState.update(key, text);
            }}>
            {valueLabel.map(({value, label}) => <Picker.Item
                labelStyle={Styles.lh40}
                key={value}
                label={label}
                value={value}/>)}
        </Picker>;
    }

    const {showToast} = useContext(ToastContext);

    function onSavePress() {
        const errMp = {
            'name': checkName(person.name),
            'phone': checkPhone(person.phone),
            'relation': person.relation ? false : 'Relation must not empty',
        } as ErrRecord;
        if (Object.values(errMp).some(v => !!v)) {
            showToast('Please check the form', ToastPresets.FAILURE);
            setErrors(errMp);
            return;
        }
        showToast('Person saving...', 'loader');
        resetMarker(true);
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
                resetMarker();
            }
        }, 500);
    }

    return (
        <VFull>
            <ScrollView contentContainerStyle={Styles.p10}>
                {getTextField('name')}
                {getTextField('phone', 16)}
                {getPicker('gender', ['-', 'Male', 'Female'].map(newValueLabel))}
                {getPicker('relation', ['Other', 'Me', 'Family'].map(newValueLabel))}
                <LargeBtn
                    disabled={marker}
                    style={Styles.mv20}
                    label={marker ? 'Saving...' : 'Save Person'}
                    onPress={onSavePress}
                />
            </ScrollView>
        </VFull>
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

