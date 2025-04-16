import {Button, ScrollView, StyleSheet, View, Text} from "react-native";
import {Styles} from "@/constants/Styles";
import {newRestaurant, Restaurant, stateChoiceRestaurant, wrapperRestaurant} from "@/store/state";
import {useEffect} from "react";
import {VFull} from "@/components/VFull";
import {router} from "expo-router";

const showKeys = Array.of<keyof Restaurant>('name', 'cuisine', 'price', 'rating', 'phone', 'address', 'website', 'delivery');

export default function TabEnjoyScreen() {
    let restaurant = stateChoiceRestaurant(state => state.obj);
    useEffect(() => {
        return () => {
            stateChoiceRestaurant.getState().objReset(newRestaurant());
        };
    }, []);

    if (!restaurant?.key) {
        return <VFull/>;
    }
    restaurant = wrapperRestaurant(restaurant);

    function renderItem(key: keyof Restaurant) {
        return <View key={key} style={styles.valueText}>
            <Text style={[styles.label, Styles.capital]}>{key}:</Text>
            <Text>{restaurant?.getHint(key) || 'N/A'}</Text>
        </View>;
    }

    return <VFull style={Styles.center}>
        <View style={Styles.w100}>
            <ScrollView style={{height: 'auto', width: '100%'}}>
                <View style={[Styles.center, Styles.ph15]}>
                    <Text style={styles.title}>Enjoy your meal</Text>
                    <View style={styles.detail}>
                        {showKeys.map((key) => renderItem(key))}
                    </View>
                    <Button
                        title='All Done'
                        onPress={() => {
                            router.replace('/(tabs)/(decision)');
                        }}/>
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
    valueText: {display: 'flex', flexDirection: 'row', alignItems: 'center', height: 30},
    title: {
        fontSize: 26,
        fontWeight: 'bold',
    },
    label: {width: 100, color: 'red'}
});