import {SafeThemedView} from '@/components/SafeThemedView';
import {Styles} from "@/constants/Styles";
import {StyleSheet} from "react-native";
import {useState} from "react";
import {Button, ButtonSize, ListItem, Text, View, Picker, TextField, Colors} from "react-native-ui-lib";

const pricePickerItems = ['', 1, 2, 3, 4, 5].map((v) => <Picker.Item key={v}
                                                                     label={String(v || 'Input select restaurant price')}
                                                                     value={v}/>);
const cuisinePickerItems = ['', 'Algerian', 'American', 'BBQ', 'Chinese', 'Other'].map((v) => <Picker.Item
    key={v}
    label={String(v || 'Input select restaurant cuisine')}
    value={v}/>);

export default function TabAddScreen() {
    const [formData, setFormData] = useState({
        name: '',
        cuisine: '',
        price: '',
        rating: '',
        phone: '',
        address: '',
        webSite: '',
        delivery: '',
        key: `r${new Date().getTime()}`
    });

    function updateFormData(key: string, value: any) {
        setFormData(Object.assign({}, formData, {[key]: value}))
    }
    return (
        <SafeThemedView style={Styles.container}>
            <TextField
                placeholder='Input with restaurant name.'
                label='Name'
                style={Styles.p0}
                containerStyle={[Styles.mb20, Styles.p0]}
                value={formData.name}
                onChangeText={(text) => updateFormData('name', text)}/>

            <View style={[styles.pickerContainer, Styles.mb20]}>
                <Picker style={styles.picker}
                        value={formData.cuisine}
                        placeholder='xxx'
                        onChangeText={(text) => updateFormData('cuisine', text)}>
                    {cuisinePickerItems}
                </Picker>
            </View>
            <View style={[styles.pickerContainer, Styles.mb20]}>
                <Picker value={formData.price} style={styles.picker}
                        placeholder='Input select restaurant price'

                        onChangeText={(text) => updateFormData('price', text)}>
                    {pricePickerItems}
                </Picker>
            </View>
        </SafeThemedView>
    );
}


const styles = StyleSheet.create({
    picker: {
        paddingVertical: 0,
    },
    pickerContainer: {
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#334',
        borderStyle: 'solid',
    },
});

