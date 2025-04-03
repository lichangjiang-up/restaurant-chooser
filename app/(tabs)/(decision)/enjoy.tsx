import {Button, ScrollView, StyleSheet, View, Text} from "react-native";
import {Styles} from "@/constants/Styles";
import {Restaurant, stateChoiceRestaurant, wrapperRestaurant} from "@/store/state";
import {router} from "expo-router";
import {useContext} from "react";
import {ToastContext} from "@/components/provider/ToastProvider";
import {VFull} from "@/components/VFull";


export default function TabEnjoyScreen() {
    const {showToast} = useContext(ToastContext)

    let restaurant = stateChoiceRestaurant(state => state.v)
    if (!restaurant?.key) {
        router.push('/');
        return <View/>;
    }
    restaurant = wrapperRestaurant(restaurant);

    const listData = Array.of<keyof Restaurant>('name', 'cuisine', 'price', 'rating', 'phone', 'address', 'website', 'delivery')
        .map(key => ({key, value: restaurant.getHint(key)}));


    function renderItem({key, value}: { key: string, value: string }) {
        return <View key={key} style={styles.valueText}>
            <Text style={[{width: 100, color: 'red'}, Styles.capital]}>{key}:</Text>
            <Text>{value}</Text>
        </View>;
    }

    return <VFull style={Styles.center}>
        <View style={{width: '100%'}}>
            <ScrollView style={{height: 'auto', width: '100%'}}>
                <View style={[Styles.center, Styles.ph15]}>
                    <Text style={styles.title}>Enjoy your meal</Text>
                    <View style={styles.detail}>
                        {listData.map((item) => renderItem(item))}
                    </View>
                    <Button
                        title='All Done'
                        onPress={() => {
                            showToast('Enjoy your meal!');
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
    }
});