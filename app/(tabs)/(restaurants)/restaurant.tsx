import {Styles} from "@/constants/Styles";
import {ScrollView, StyleSheet} from "react-native";
import {useContext} from "react";
import {Button, ButtonSize, Colors, Picker, TextField, ToastPresets} from "react-native-ui-lib";
import {router} from "expo-router";
import {ToastContext} from "@/components/provider/ToastProvider";
import {Restaurant, stateRestaurant, stateRestaurants, StorageTyp} from "@/store/store";
import {initLastModifiedAndRet} from "@/store/storage";
import {newValueLabel, ValueLabel} from "@/components/ui/PikerView";
import {SafeContainer} from "@/components/SafeContainer";

export default function UpsertRestaurantScreen() {
    const restaurant = stateRestaurant((state) => state.v);
    const marker = stateRestaurant((state) => state.marker);
    const state = stateRestaurant.getState();
    const styles = getStyles();

    function getTextField(key: keyof Restaurant, name: string, maxLength = 30) {
        return <TextField
            key={key}
            multiline={maxLength > 30}
            placeholder={`Input with person ${name.toLocaleLowerCase()}`}
            label={name}
            maxLength={maxLength}
            validateOnBlur={true}
            color={Colors.$textDefault}
            containerStyle={[Styles.mb20, styles.tfContainer]}
            value={restaurant[key] as any}
            style={styles.tf}
            onChangeText={(text) => state.update(key, text)}/>;
    }

    function getPicker(key: keyof Restaurant, name: string, valueLabel: ValueLabel[]) {
        return <Picker
            key={key}
            style={[styles.picker, Styles.mb20]}
            value={restaurant[key] as any}
            label={name}
            placeholder={`Select ${name.toLocaleLowerCase()}`}
            onChange={(text) => state.update(key, text)}>
            {valueLabel.map(({value, label}) => <Picker.Item
                labelStyle={{lineHeight: 40}}
                key={value}
                label={label}
                value={value}/>)}
        </Picker>;
    }

    const {showToast} = useContext(ToastContext);

    function onSavePress() {
        if (!(restaurant.name && restaurant.cuisine && restaurant.price && restaurant.rating && restaurant.delivery)) {
            showToast('Name/Cuisine/Price/Rating/Delivery must not empty', ToastPresets.FAILURE);
            return;
        }
        showToast('Restaurant saving...', 'loader');
        state.resetMarker(true);
        setTimeout(() => {
            try {
                const res = state.merge(initLastModifiedAndRet(restaurant, StorageTyp.RESTAURANT));
                stateRestaurants.getState().add(res.key, res);
                showToast('Restaurant saved');
                router.back();
            } catch (err) {
                showToast('Restaurant save failed', ToastPresets.FAILURE);
                console.log(err);
            } finally {
                state.resetMarker();
            }
        }, 500);
    }

    return (
        <SafeContainer>
            <ScrollView contentContainerStyle={Styles.p10}>
                {getTextField('name', 'Name')}
                {getPicker('cuisine', 'Cuisine', ['Algerian', 'American', 'BBQ', 'Chinese', 'Other'].map(newValueLabel))}
                {getPicker('price', 'Price', [1, 2, 3, 4, 5].map(newValueLabel))}
                {getPicker('rating', 'Rating', [1, 2, 3, 4, 5].map(newValueLabel))}
                {getTextField('phone', 'Phone number')}
                {getTextField('address', 'Address')}
                {getTextField('webSite', 'Website', 512)}
                {getPicker('delivery', 'Delivery', ['Yes', 'No'].map(newValueLabel))}
                <Button
                    disabled={marker}
                    label={marker ? 'Saving...' : 'Save Restaurant'}
                    backgroundColor={Colors.$backgroundNeutralHeavy}
                    borderRadius={14}
                    size={ButtonSize.large}
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

