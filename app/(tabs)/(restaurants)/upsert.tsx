import {Styles} from "@/constants/Styles";
import {ScrollView, StyleSheet} from "react-native";
import {ReactNode, useContext, useState} from "react";
import {Button, ButtonSize, Colors, Picker, TextField, ToastPresets} from "react-native-ui-lib";
import {Validator} from "react-native-ui-lib/src/components/textField/types";
import {ThemedView} from "@/components/ThemedView";
import {Restaurant, RESTAURANT_STORAGE, storageListByTyp} from "@/constants/Storage";
import {router} from "expo-router";
import {ToastContext} from "@/components/provider/ToastProvider";

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


export default function TabAddScreen({data}: { data?: any }) {
    const [formData, setFormData] = useState(data || new Restaurant());

    const [isSaving, setSaving] = useState(false);

    function updateFormData(key: string, value: any) {
        setFormData(Object.assign({}, formData, {[key]: value}))
    }

    const styles = getStyles();

    function getTextField(key: string, name: string, validate: Validator | Validator[], validationMessage: string[], maxLength = 30) {
        if (!name) {
            name = key.toWellFormed()
        }
        return <TextField
            key={key}
            placeholder={`Input with restaurant ${name.toLocaleLowerCase()}`}
            label={name}
            maxLength={maxLength}
            validate={validate}
            validationMessage={validationMessage.map(m => `${name} ${m}`)}
            validateOnBlur
            color={Colors.$textDefault}
            containerStyle={[Styles.mb20, styles.tfContainer]}
            value={formData[key]}
            style={styles.tf}
            onChangeText={(text) => updateFormData(key, text)}/>;
    }

    function getPicker(key: string, name: string, children: ReactNode[], validate: Validator | Validator[]) {
        return <Picker
            key={key}
            style={[styles.picker, Styles.mb20]}
            value={formData[key]}
            validate={validate}
            label={name}
            placeholder={`Select restaurant ${name.toLocaleLowerCase()}`}
            onChange={(text) => updateFormData(key, text)}>
            {children}
        </Picker>;
    }

    const {showToast} = useContext(ToastContext);

    function onSavePress() {
        setSaving(true)
        showToast('Restaurant saving...', 'loader');
        setTimeout(() => {
            formData.key ||= new Date().getTime().toString();
            console.log(formData.key);
            try {
                storageListByTyp(RESTAURANT_STORAGE, formData.key, formData);
                showToast('Restaurant saved');
                router.back();
            } catch (err) {
                showToast('Restaurant save failed', ToastPresets.FAILURE);
                console.log(err);
            } finally {
                setSaving(false);
            }
        }, 1000);
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
                    disabled={isSaving}
                    label={isSaving ? 'Saving...' : 'Save Restaurant'}
                    backgroundColor={Colors.$backgroundNeutralHeavy}
                    borderRadius={6}
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

