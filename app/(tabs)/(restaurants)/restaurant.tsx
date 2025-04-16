import {Styles} from "@/constants/Styles";
import {KeyboardTypeOptions, ScrollView} from "react-native";
import {useEffect} from "react";
import {router} from "expo-router";
import {
    CUISINES, LEVELS,
    newMarkerStore,
    newRecordStore,
    Restaurant,
    stateRestaurant,
    stateRestaurants,
    YES_OR_NO
} from "@/store/state";
import {initLastModifiedAndRet} from "@/store/storage";
import MyBtn from "@/components/ui/MyBtn";
import {checkAddress, checkName, checkPhone, checkWebsite, ErrMsg, trimObjByKeys} from "@/constants/method";
import MyPiker, {newValueLabel, ValueLabel} from "@/components/ui/MyPiker";
import MyTextInput from "@/components/ui/MyTextInput";


type ErrRecord = Record<keyof Restaurant, ErrMsg>;

const errRecordState = newRecordStore<keyof Restaurant, ErrMsg>();
const markerState = newMarkerStore();

const trimKeys = Array.of<keyof Restaurant>('name', 'website', 'phone', 'address');

export default function UpsertRestaurantScreen() {
    const restaurant = stateRestaurant((state) => state.obj);
    const {marker, resetMarker} = markerState();
    const state = stateRestaurant.getState();

    const {record, resetRecord, deleteRecord} = errRecordState();

    useEffect(() => {
        return () => {
            resetRecord({} as ErrRecord);
            resetMarker();
        };
    }, [resetRecord, resetMarker]);

    function getTextField(key: keyof Restaurant, keyboardType: KeyboardTypeOptions = 'default', maxLength = 30) {
        const newErr = record[key];
        const value = restaurant[key];
        return <MyTextInput
            key={key}
            multiline={maxLength > 30}
            placeholder={`Input with person ${key}`}
            label={key}
            maxLength={maxLength}
            value={value as any}
            errMsg={newErr}
            keyboardType={keyboardType}
            onFocus={() => deleteRecord(key)}
            onChangeText={(text) => state.objUpdate(key, text)}/>;
    }

    function getPicker(key: keyof Restaurant, valueLabels: ValueLabel[]) {
        const newErr = record[key];
        return <MyPiker
            key={key}
            keyName={key}
            valueLabels={valueLabels}
            value={restaurant[key] as string}
            errMsg={newErr}
            onChange={(text) => {
                deleteRecord(key);
                state.objUpdate(key, text);
            }}/>;
    }

    function onSavePress() {
        const errMp = {
            'name': checkName(restaurant.name, 'Name'),
            'phone': checkPhone(restaurant.phone),
            'cuisine': restaurant.cuisine ? false : 'Cuisine required',
            'rating': restaurant.rating ? false : 'Rating required',
            'price': restaurant.price ? false : 'Price required',
            'delivery': restaurant.delivery ? false : 'Delivery required',
            'website': checkWebsite(restaurant.website),
            'address': checkAddress(restaurant.address),
        } as ErrRecord;
        resetRecord(errMp);
        if (Object.values(errMp).some(v => !!v)) {
            return;
        }
        resetMarker(true);
        const res = state.objMerge(initLastModifiedAndRet(trimObjByKeys(restaurant, trimKeys)));
        setTimeout(() => {
            try {
                stateRestaurants.getState().addRecord(res.key, res);
                router.replace('/(tabs)/(restaurants)');
            } catch (err) {
                console.log(err);
            } finally {
                resetMarker();
            }
        }, 500);
    }

    return (
        <ScrollView contentContainerStyle={[Styles.p10, Styles.gap20]} style={Styles.hw100}>
            {getTextField('name')}
            {getPicker('cuisine', newValueLabel(CUISINES))}
            {getPicker('price', newValueLabel(LEVELS))}
            {getPicker('rating', newValueLabel(LEVELS))}
            {getTextField('phone', 'phone-pad')}
            {getTextField('address')}
            {getTextField('website', 'url', 512)}
            {getPicker('delivery', newValueLabel(YES_OR_NO))}
            <MyBtn
                style={Styles.mv20}
                isLoading={marker}
                disabled={marker}
                label={marker ? 'Saving...' : 'Save Restaurant'}
                onPress={() => onSavePress()}
            />
        </ScrollView>
    );
}