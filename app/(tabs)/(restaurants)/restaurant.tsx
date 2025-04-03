import {Styles} from "@/constants/Styles";
import {ScrollView, StyleSheet} from "react-native";
import {useContext, useEffect} from "react";
import {Colors, Picker, TextField, ToastPresets} from "react-native-ui-lib";
import {router} from "expo-router";
import {ToastContext} from "@/components/provider/ToastProvider";
import {
    CUISINES, LEVELS,
    newMarkerStore,
    newRecordStore,
    Restaurant,
    stateRestaurant,
    stateRestaurants,
    StorageTyp, YES_OR_NO
} from "@/store/state";
import {initLastModifiedAndRet} from "@/store/storage";
import {newValueLabel, ValueLabel} from "@/components/ui/PikerView";
import {VFull} from "@/components/VFull";
import LargeBtn from "@/components/ui/LargeBtn";
import {checkName, checkPhone, checkWebsite} from "@/constants/method";


type ErrRecord = Record<keyof Restaurant, string | false | undefined>;

const errRecordState = newRecordStore<keyof Restaurant, string | false | undefined>();
const markerState = newMarkerStore();

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

    function getTextField(key: keyof Restaurant, maxLength = 30) {
        const newErr = record[key];
        const value = restaurant[key];
        return <TextField
            key={key}
            multiline={maxLength > 30}
            placeholder={`Input with person ${key}`}
            label={newErr || key}
            labelStyle={Styles.capital}
            labelColor={newErr ? 'red' : undefined}
            maxLength={maxLength}
            color={Colors.$textDefault}
            containerStyle={[Styles.mb20, styles.tfContainer, newErr ? {borderColor: 'red'} : {}]}
            value={value as any}
            style={styles.tf}
            onBlur={() => {
                if (typeof value === 'string') {
                    const trimV = value.trim();
                    trimV !== value && state.objUpdate(key, trimV);
                }
            }}
            onFocus={() => deleteRecord(key)}
            onChangeText={(text) => state.objUpdate(key, text)}/>;
    }

    function getPicker(key: keyof Restaurant, valueLabel: ValueLabel[]) {
        const newErr = record[key];
        return <Picker
            key={key}
            style={[styles.picker, Styles.mb20, newErr ? {borderColor: 'red'} : {}]}
            value={restaurant[key] as any}
            label={newErr || key}
            labelColor={newErr ? 'red' : undefined}
            placeholder={`Select ${key}`}
            labelStyle={Styles.capital}
            onChange={(text) => {
                deleteRecord(key);
                state.objUpdate(key, text);
            }}>
            {valueLabel.map(({value, label}) => <Picker.Item
                labelStyle={Styles.lh40}
                key={value}
                label={label}
                value={value}/>)}
        </Picker>;
    }

    function onSavePress() {
        const errMp = {
            'name': checkName(restaurant.name),
            'phone': checkPhone(restaurant.phone),
            'cuisine': restaurant.cuisine ? false : 'Cuisine must not empty',
            'rating': restaurant.rating ? false : 'Rating must not empty',
            'price': restaurant.price ? false : 'Price must not empty',
            'delivery': restaurant.delivery ? false : 'Delivery must not empty',
            'website': checkWebsite(restaurant.website),
        } as ErrRecord;
        resetRecord(errMp);
        if (Object.values(errMp).some(v => !!v)) {
            showToast('Please check the form', ToastPresets.FAILURE);
            return;
        }
        showToast('Restaurant saving...', 'loader');
        resetMarker(true);
        setTimeout(() => {
            try {
                const res = state.objMerge(initLastModifiedAndRet(restaurant, StorageTyp.RESTAURANT));
                stateRestaurants.getState().addRecord(res.key, res);
                showToast('Restaurant saved');
                router.replace('/(tabs)/(restaurants)/restaurants');
            } catch (err) {
                showToast('Restaurant save failed', ToastPresets.FAILURE);
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
                {getPicker('cuisine', CUISINES.map(newValueLabel))}
                {getPicker('price', LEVELS.map(newValueLabel))}
                {getPicker('rating', LEVELS.map(newValueLabel))}
                {getTextField('phone')}
                {getTextField('address')}
                {getTextField('website', 512)}
                {getPicker('delivery', YES_OR_NO.map(newValueLabel))}
                <LargeBtn
                    style={Styles.mv20}
                    disabled={marker}
                    label={marker ? 'Saving...' : 'Save Restaurant'}
                    onPress={() => onSavePress()}
                />
            </ScrollView>
        </VFull>
    );
}

const styles = StyleSheet.create({
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
});

