import {Styles} from "@/constants/Styles";
import {ScrollView, StyleSheet} from "react-native";
import {ReactNode, useContext, useState} from "react";
import {Button, ButtonSize, Colors, Picker, TextField, ToastPresets} from "react-native-ui-lib";
import {Validator} from "react-native-ui-lib/src/components/textField/types";
import {ThemedView} from "@/components/ThemedView";
import {Restaurant, RESTAURANT_STORAGE, storageListByTyp} from "@/constants/Storage";
import {router} from "expo-router";
import {ToastContext} from "@/components/provider/ToastProvider";
import {USW} from "@/constants/UseStateWrapper";

const pricePickerItems = [1, 2, 3, 4, 5]
    .map(String)
    .map((v) =>
        <Picker.Item key={v}
                     labelStyle={{lineHeight: 40}}
                     label={v}
                     value={v}/>);

const ratingPickerItems = [1, 2, 3, 4, 5]
    .map(String)
    .map((v) =>
        <Picker.Item key={v}
                     labelStyle={{lineHeight: 40}}
                     label={v}
                     value={v}/>);

const cuisinePickerItems = ['Algerian', 'American', 'BBQ', 'Chinese', 'Other']
    .map((v, index) => <Picker.Item
        key={index}
        labelStyle={{lineHeight: 40}}
        label={v}
        value={v}/>);

const g6Len: Validator[] = (['required', (value?: string) => (value ?? '').length > 6]);
const vMsg = ['is required', 'is too short']
const checkWebsite: Validator[] = [(value) => !value || (value.length > 6 && ['http://', 'https://'].every(htp => value.startsWith(htp)))];

export default function UpsertRestaurantScreen() {
    const [usw, setUsw] = useState(new USW(new Restaurant()));
    const formData = usw.v;

    function updateFormData(key: keyof Restaurant, value: any) {
        setUsw(usw.renewObj({[key]: value}));
    }

    const styles = getStyles();

    function getTextField(key: keyof Restaurant, name: string, validate: Validator | Validator[], validationMessage: string[], maxLength = 30) {
        return <TextField
            key={key}
            multiline={maxLength > 30}
            placeholder={`Input with restaurant ${name.toLocaleLowerCase()}`}
            label={name}
            maxLength={maxLength}
            validate={validate}
            validationMessage={validationMessage.map(m => `${name} ${m}`)}
            validateOnBlur={true}
            color={Colors.$textDefault}
            containerStyle={[Styles.mb20, styles.tfContainer]}
            value={formData[key] as any}
            style={styles.tf}
            onChangeText={(text) => updateFormData(key, text)}/>;
    }

    function getPicker(key: keyof Restaurant, name: string, children: ReactNode[], validate: Validator | Validator[]) {
        return <Picker
            key={key}
            style={[styles.picker, Styles.mb20]}
            value={formData[key] as any}
            validate={validate}
            label={name}
            placeholder={`Select restaurant ${name.toLocaleLowerCase()}`}
            onChange={(text) => updateFormData(key, text)}>
            {children}
        </Picker>;
    }

    const {showToast} = useContext(ToastContext);

    function onSavePress() {
        if (!formData.name) {
            showToast('Restaurant name must not empty', ToastPresets.FAILURE);
            return;
        }
        showToast('Restaurant saving...', 'loader');
        setUsw(usw.renewMarked(true));
        setTimeout(() => {
            formData.key ||= `r${formData.initLastModifiedAndRet()}`;
            try {
                storageListByTyp(RESTAURANT_STORAGE, formData.key, formData);
                showToast('Restaurant saved');
                router.back();
            } catch (err) {
                showToast('Restaurant save failed', ToastPresets.FAILURE);
                console.log(err);
            } finally {
                setUsw(usw.renewMarked());
            }
        }, 500);
    }


    return (
        <ThemedView style={Styles.hw100}>
            <ScrollView contentContainerStyle={Styles.p10}>
                {getTextField('name', 'Name', g6Len, vMsg)}
                {getPicker('cuisine', 'Cuisine', cuisinePickerItems, ['required'])}
                {getPicker('price', 'Price', pricePickerItems, ['required'])}
                {getPicker('rating', 'Rating', ratingPickerItems, ['required'])}
                {getTextField('phone', 'Phone number', g6Len, vMsg, 16)}
                {getTextField('address', 'Address', g6Len, vMsg, 128)}
                {getTextField('webSite', 'Website', checkWebsite, ['Website format mismatch'], 512)}
                {getPicker('delivery', 'Delivery',
                    [<Picker.Item labelStyle={{lineHeight: 40}} key='yes' label='Yes' value='Yes'/>,
                        <Picker.Item labelStyle={{lineHeight: 40}} key='no' label='No' value='No'/>], ['required'])}
                <Button
                    disabled={usw.marked}
                    label={usw.marked ? 'Saving...' : 'Save Restaurant'}
                    backgroundColor={Colors.$backgroundNeutralHeavy}
                    borderRadius={14}
                    size={ButtonSize.large}
                    onPress={onSavePress}
                    color={Colors.$white}
                />
            </ScrollView>
        </ThemedView>
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

