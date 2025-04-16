import {Styles} from "@/constants/Styles";
import {KeyboardTypeOptions, ScrollView} from "react-native";
import {useContext, useEffect} from "react";
import {ToastPresets} from "react-native-ui-lib";
import {router} from "expo-router";
import {ToastContext} from "@/components/provider/ToastProvider";
import {
    GENDERS,
    newMarkerStore,
    newRecordStore as newRecordStore,
    Person,
    PERSON_RELATIONS,
    statePeople,
    statePerson,
} from "@/store/state";
import {initLastModifiedAndRet} from "@/store/storage";
import LargeBtn from "@/components/ui/LargeBtn";
import MyPiker, {newValueLabel, ValueLabel} from "@/components/ui/MyPiker";
import {checkName, checkPhone, trimObjByKeys} from "@/constants/method";
import MyTextInput from "@/components/ui/MyTextInput";


const markerState = newMarkerStore();

type ErrRecord = Record<keyof Person, string | false | undefined>;
const errRecordStore = newRecordStore<keyof Person, string | false | undefined>();

const trimKeys = Array.of<keyof Person>('lastname', 'firstname', 'phone');

export default function UpsertPersonScreen() {
    const person = statePerson((state) => state.obj);
    const {marker, resetMarker} = markerState();
    const personState = statePerson.getState();

    person.gender ||= '-';

    const {record, resetRecord, deleteRecord} = errRecordStore();

    useEffect(() => {
        return () => {
            resetRecord({} as ErrRecord);
            resetMarker();
        };
    }, [resetRecord, resetMarker]);


    function getTextField(key: keyof Person, keyboardType: KeyboardTypeOptions = 'default', maxLength = 30) {
        const newErr = record[key];
        const value = person[key];

        return <MyTextInput
            key={key}
            errMsg={newErr}
            multiline={maxLength > 30}
            placeholder={`Input with person ${key}`}
            label={key}
            maxLength={maxLength}
            value={value as any}
            keyboardType={keyboardType}
            onFocus={() => deleteRecord(key)}
            onChangeText={(text) => personState.objUpdate(key, text)}/>;
    }

    function getPicker(key: keyof Person, valueLabels: ValueLabel[]) {
        const newErr = record[key];

        return <MyPiker
            key={key}
            keyName={key}
            valueLabels={valueLabels}
            value={person[key]}
            label={key}
            errMsg={newErr}
            onChange={(text) => {
                deleteRecord(key);
                personState.objUpdate(key, text);
            }}/>;
    }

    const {showToast} = useContext(ToastContext);

    function onSavePress() {
        const errMp = {
            'firstname': checkName(person.firstname, 'firstname'),
            'lastname': checkName(person.lastname, 'lastname'),
            'phone': checkPhone(person.phone),
            'relation': person.relation ? false : 'Relation must not empty',
        } as ErrRecord;
        resetRecord(errMp);
        if (Object.values(errMp).some(v => !!v)) {
            showToast('Please check the form', ToastPresets.FAILURE);
            return;
        }
        showToast('Person saving...', 'loader');
        resetMarker(true);
        const res = personState.objMerge(initLastModifiedAndRet(trimObjByKeys(person, trimKeys)));
        setTimeout(() => {
            try {
                statePeople.getState().addRecord(res.key, res);
                showToast('Person saved');
                if (router.canGoBack()) {
                    router.back();
                } else {
                    router.push('/(tabs)/(people)')
                }
            } catch (err) {
                showToast('Person save failed', ToastPresets.FAILURE);
                console.log(err);
            } finally {
                resetMarker();
            }
        }, 500);
    }

    return (
        <ScrollView contentContainerStyle={Styles.p10} style={Styles.hw100}>
            {getTextField('firstname')}
            {getTextField('lastname')}
            {getTextField('phone', 'phone-pad', 16)}
            {getPicker('gender', newValueLabel(GENDERS))}
            {getPicker('relation', newValueLabel(PERSON_RELATIONS))}
            <LargeBtn
                disabled={marker}
                style={Styles.mv20}
                label={marker ? 'Saving...' : 'Save Person'}
                onPress={onSavePress}
            />
        </ScrollView>
    );
}
