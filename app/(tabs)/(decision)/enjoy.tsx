import {Button, ScrollView, StyleSheet, View, Text} from "react-native";
import {Styles} from "@/constants/Styles";
import {Restaurant, stateChoiceRestaurant} from "@/store/store";
import {router} from "expo-router";
import {SafeContainer} from "@/components/SafeContainer";
import {useContext} from "react";
import {ToastContext} from "@/components/provider/ToastProvider";


export default function TabEnjoyScreen() {
    const restaurant = stateChoiceRestaurant(state => state.v)
    if (!restaurant || !restaurant.key) {
        router.push('/');
        return;
    }

    const listData = ['Name', 'Cuisine', 'Price', 'Rating', 'Phone', 'Address', 'Website', 'Delivery'].map(key => {
        return {key, value: restaurant.getHint(key.toLocaleLowerCase() as keyof Restaurant)};
    });

    const {showToast} = useContext(ToastContext)

    function renderItem({key, value}: { key: string, value: string }) {
        return <View key={key} style={Styles.rowBtw}>
            <Text style={{width: 100, color: 'red'}}>{key}:</Text>
            <Text>{value}</Text>
        </View>;
    }

    return <SafeContainer style={Styles.center}>
        <ScrollView style={{height: 'auto', width: '100%'}}>
            <View style={Styles.cContainer}>
                <Text>Enjoy your meal</Text>
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
    </SafeContainer>;
}

const styles = StyleSheet.create({
    detail: {
        borderStyle: 'solid',
        borderWidth: 3,
        borderColor: 'black',
        padding: 10,
        width: '100%',
        marginVertical: 40,
    }
});