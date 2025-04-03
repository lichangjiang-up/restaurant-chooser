import { Button, ScrollView, StyleSheet, View, Text } from "react-native";
import { Styles } from "@/constants/Styles";
import { newRestaurant, Restaurant, stateChoiceRestaurant, wrapperRestaurant } from "@/store/state";
import { useContext, useEffect } from "react";
import { ToastContext } from "@/components/provider/ToastProvider";
import { VFull } from "@/components/VFull";


export default function TabEnjoyScreen() {
    const { showToast } = useContext(ToastContext);
    let restaurant = stateChoiceRestaurant(state => state.v);

    if (!restaurant?.key) {
        return <VFull />;
    }
    useEffect(() => {
        return () => stateChoiceRestaurant.getState().reset(newRestaurant());
    });
    restaurant = wrapperRestaurant(restaurant);
    const showKeys = Array.of<keyof Restaurant>('name', 'cuisine', 'price', 'rating', 'phone', 'address', 'website', 'delivery');
    function renderItem(key: keyof Restaurant) {
        return <View key={key} style={styles.valueText}>
            <Text style={[styles.label, Styles.capital]}>{key}:</Text>
            <Text>{restaurant?.getHint(key) || 'N/A'}</Text>
        </View>;
    }

    return <VFull style={Styles.center}>
        <View style={Styles.w100}>
            <ScrollView style={{ height: 'auto', width: '100%' }}>
                <View style={[Styles.center, Styles.ph15]}>
                    <Text style={styles.title}>Enjoy your meal</Text>
                    <View style={styles.detail}>
                        {showKeys.map((key) => renderItem(key))}
                    </View>
                    <Button
                        title='All Done'
                        onPress={() => {
                            showToast('Enjoy your meal!');
                        }} />
                </View>
            </ScrollView>
        </View>
    </VFull>;
}

const styles = StyleSheet.create({
    detail: {
        borderStyle: 'solid',
        borderWidth: 3,
        borderColor: 'black',
        padding: 10,
        width: '100%',
        marginVertical: 40,
        borderRadius: 6,
    },
    valueText: { display: 'flex', flexDirection: 'row', alignItems: 'center', height: 30 },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
    },
    label: { width: 100, color: 'red' }
});