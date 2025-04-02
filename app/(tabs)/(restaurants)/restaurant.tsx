import {Styles} from "@/constants/Styles";
import {ScrollView, StyleSheet} from "react-native";
import {useContext, useState} from "react";
import {Colors, Picker, TextField, ToastPresets} from "react-native-ui-lib";
import {router} from "expo-router";
import {ToastContext} from "@/components/provider/ToastProvider";
import {
    checkName,
    checkPhone, checkWebsite,
    createMarkerStore,
    Restaurant,
    stateRestaurant,
    stateRestaurants,
    StorageTyp
} from "@/store/state";
import {initLastModifiedAndRet} from "@/store/storage";
import {newValueLabel, ValueLabel} from "@/components/ui/PikerView";
import {VFull} from "@/components/VFull";
import LargeBtn from "@/components/ui/LargeBtn";


const markerState = createMarkerStore();

type ErrRecord = Record<keyof Restaurant, string | false | undefined>;

export default function UpsertRestaurantScreen() {
    const restaurant = stateRestaurant((state) => state.v);
    const {marker, resetMarker} = markerState();
    const state = stateRestaurant.getState();
    const styles = getStyles();

    const [errors, setErrors] = useState<ErrRecord>({} as ErrRecord);

    function getTextField(key: keyof Restaurant, name: string, maxLength = 30) {
        const newErr = errors[key];
        return <TextField
            key={key}
            multiline={maxLength > 30}
            placeholder={`Input with person ${name.toLowerCase()}`}
            label={newErr || name}
            labelColor={newErr ? 'red' : undefined}
            maxLength={maxLength}
            color={Colors.$textDefault}
            containerStyle={[Styles.mb20, styles.tfContainer, newErr ? {borderColor: 'red'} : {}]}
            value={restaurant[key] as any}
            style={styles.tf}
            onBlur={() => {
                const v = restaurant[key];
                if (v && typeof v === 'string' && v.trim().length !== v.length) {
                    state.update(key, v.trim());
                }
            }}
            onFocus={() => (delete errors[key]) && setErrors({...errors})}
            onChangeText={(text) => state.update(key, text)}/>;
    }

    function getPicker(key: keyof Restaurant, name: string, valueLabel: ValueLabel[]) {
        const newErr = errors[key];
        return <Picker
            key={key}
            hint={name}
            style={[styles.picker, Styles.mb20, newErr ? {borderColor: 'red'} : {}]}
            value={restaurant[key] as any}
            label={newErr || name}
            labelColor={newErr ? 'red' : undefined}
            placeholder={`Select ${name.toLocaleLowerCase()}`}
            onChange={(text) => {
                (delete errors[key]) && setErrors({...errors});
                state.update(key, text);
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
            'name': checkName(restaurant.name),
            'phone': checkPhone(restaurant.phone),
            'cuisine': restaurant.cuisine ? false : 'Cuisine must not empty',
            'rating': restaurant.rating ? false : 'Rating must not empty',
            'price': restaurant.price ? false : 'Price must not empty',
            'delivery': restaurant.delivery ? false : 'Delivery must not empty',
            'website': checkWebsite(restaurant.website),
        } as ErrRecord;
        if (Object.values(errMp).some(v => !!v)) {
            showToast('Please check the form', ToastPresets.FAILURE);
            setErrors(errMp);
            return;
        }
        showToast('Restaurant saving...', 'loader');
        resetMarker(true);
        setTimeout(() => {
            try {
                const res = state.merge(initLastModifiedAndRet(restaurant, StorageTyp.RESTAURANT));
                stateRestaurants.getState().add(res.key, res);
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
                {getTextField('name', 'Name')}
                {getPicker('cuisine', 'Cuisine', ['Algerian', 'American', 'BBQ', 'Chinese', 'Other'].map(newValueLabel))}
                {getPicker('price', 'Price', [1, 2, 3, 4, 5].map(newValueLabel))}
                {getPicker('rating', 'Rating', [1, 2, 3, 4, 5].map(newValueLabel))}
                {getTextField('phone', 'Phone number')}
                {getTextField('address', 'Address')}
                {getTextField('website', 'Website', 512)}
                {getPicker('delivery', 'Delivery', ['Yes', 'No'].map(newValueLabel))}
                <LargeBtn
                    style={Styles.mv20}
                    disabled={marker}
                    label={marker ? 'Saving...' : 'Save Restaurant'}
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

