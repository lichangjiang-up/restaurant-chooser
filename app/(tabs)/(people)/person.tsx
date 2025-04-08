import {Styles} from "@/constants/Styles";
import {ScrollView} from "react-native";
import {useContext, useEffect} from "react";
import {Colors, TextField, ToastPresets} from "react-native-ui-lib";
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
    StorageTyp
} from "@/store/state";
import {initLastModifiedAndRet} from "@/store/storage";
import LargeBtn from "@/components/ui/LargeBtn";
import {checkName, checkPhone} from "@/constants/method";
import MyPiker, {newValueLabel, ValueLabel} from "@/components/ui/MyPiker";


const markerState = newMarkerStore();

type ErrRecord = Record<keyof Person, string | false | undefined>;
const errRecordStore = newRecordStore<keyof Person, string | false | undefined>();


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


    function getTextField(key: keyof Person, maxLength = 30) {
        const newErr = record[key];
        const value = person[key];
        return <TextField
            key={key}
            multiline={maxLength > 30}
            placeholder={`Input with person ${key}`}
            label={newErr || key}
            labelColor={newErr ? 'red' : undefined}
            maxLength={maxLength}
            color={Colors.$textDefault}
            labelStyle={Styles.capital}
            containerStyle={[Styles.mb20, Styles.tfContainer, newErr ? {borderColor: 'red'} : {}]}
            value={value as any}
            style={Styles.tf}
            onFocus={() => deleteRecord(key)}
            onChangeText={(text) => {
                text = text?.trim();
                personState.objUpdate(key, text);
            }}/>;
    }

    function getPicker(key: keyof Person, valueLabels: ValueLabel[]) {
        const newErr = record[key];

        return <MyPiker
            key={key}
            keyName={key}
            valueLabels={valueLabels}
            style={newErr ? {borderColor: 'red'} : {}}
            value={person[key]}
            label={newErr || key}
            labelColor={newErr ? 'red' : undefined}
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
        setTimeout(() => {
            try {
                const res = personState.objMerge(initLastModifiedAndRet(person, StorageTyp.PERSON));
                statePeople.getState().addRecord(res.key, res);
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
        <ScrollView contentContainerStyle={Styles.p10} style={Styles.hw100}>
            {getTextField('firstname')}
            {getTextField('lastname')}
            {getTextField('phone', 16)}
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
