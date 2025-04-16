import {Styles} from "@/constants/Styles";
import {KeyboardTypeOptions, ScrollView} from "react-native";
import {useContext, useEffect} from "react";
import {ToastPresets} from "react-native-ui-lib";
import {router} from "expo-router";
import {ToastContext} from "@/components/provider/ToastProvider";
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
import LargeBtn from "@/components/ui/LargeBtn";
import {checkAddress, checkName, checkPhone, checkWebsite, trimObjByKeys} from "@/constants/method";
import MyPiker, {newValueLabel, ValueLabel} from "@/components/ui/MyPiker";
import MyTextInput from "@/components/ui/MyTextInput";


type ErrRecord = Record<keyof Restaurant, string | false | undefined>;

const errRecordState = newRecordStore<keyof Restaurant, string | false | undefined>();
const markerState = newMarkerStore();

const trimKeys = Array.of<keyof Restaurant>('name', 'website', 'phone', 'address');

export default function UpsertRestaurantScreen() {
    const {showToast} = useContext(ToastContext);
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
            label={key}
            errMsg={newErr}
            onChange={(text) => {
                deleteRecord(key);
                state.objUpdate(key, text);
            }}/>;
    }

    function onSavePress() {
        const errMp = {
            'name': checkName(restaurant.name, 'name'),
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
            showToast('Please check the form', ToastPresets.FAILURE);
            return;
        }
        showToast('Restaurant saving...', 'loader');
        resetMarker(true);
        const res = state.objMerge(initLastModifiedAndRet(trimObjByKeys(restaurant, trimKeys)));
        setTimeout(() => {
            try {
                stateRestaurants.getState().addRecord(res.key, res);
                showToast('Restaurant saved');
                router.replace('/(tabs)/(restaurants)');
            } catch (err) {
                showToast('Restaurant save failed', ToastPresets.FAILURE);
                console.log(err);
            } finally {
                resetMarker();
            }
        }, 500);
    }

    return (
        <ScrollView contentContainerStyle={Styles.p10} style={Styles.hw100}>
            {getTextField('name')}
            {getPicker('cuisine', newValueLabel(CUISINES))}
            {getPicker('price', newValueLabel(LEVELS))}
            {getPicker('rating', newValueLabel(LEVELS))}
            {getTextField('phone', 'phone-pad')}
            {getTextField('address')}
            {getTextField('website', 'url', 512)}
            {getPicker('delivery', newValueLabel(YES_OR_NO))}
            <LargeBtn
                style={Styles.mv20}
                disabled={marker}
                label={marker ? 'Saving...' : 'Save Restaurant'}
                onPress={() => onSavePress()}
            />
        </ScrollView>
    );
}