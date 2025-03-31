import {FlatList, StyleSheet} from 'react-native';

import {SafeThemedView} from "@/components/SafeThemedView";
import {router} from "expo-router";
import {Styles} from "@/constants/Styles";
import {Button, ButtonSize, Colors, Text, View} from "react-native-ui-lib";
import {descSortStorage} from "@/store/storage";
import {useContext} from "react";
import {ToastContext} from "@/components/provider/ToastProvider";
import {HapticPressable} from "@/components/ui/HapticPressable";
import {Restaurant, stateRestaurant, stateRestaurants} from "@/store/store";

export default function TabRestaurantsScreen() {
    const restaurants = Object.values(stateRestaurants(state => state.v)) as Restaurant[];
    const state = stateRestaurants.getState();
    const {showToast} = useContext(ToastContext);


    const styles = getStyles();

    function renderItem({item}: { item: Restaurant }) {
        return <HapticPressable
            onPress={upsertRestaurant(item)}
            key={item.key}>
            <View style={[Styles.borderBottom, Styles.rowBtw, Styles.p10_8]}>
                <Text style={styles.itemText} $textDefault>{item.name || item.key}</Text>
                <Button backgroundColor={Colors.$backgroundNeutralHeavy}
                        color={Colors.$white}
                        label='Delete'
                        labelStyle={Styles.lh30}
                        size={ButtonSize.large}
                        borderRadius={14}
                        onPress={() => {
                            state.delete(item.key);
                            showToast('Restaurant deleted');
                        }}/>
            </View>
        </HapticPressable>;
    }

    return (
        <SafeThemedView style={Styles.hw100}>
            <FlatList data={descSortStorage(restaurants)}
                      style={[Styles.flexG1, Styles.ph5]}
                      keyExtractor={({key}) => key}
                      renderItem={renderItem}>
            </FlatList>
            <Button
                label='Add Restaurant'
                backgroundColor={Colors.$backgroundNeutralHeavy}
                borderRadius={14}
                size={ButtonSize.large}
                style={Styles.m15}
                labelStyle={Styles.lh30}
                onPress={upsertRestaurant()}
                color={Colors.$white}
            />
        </SafeThemedView>
    );
}

function upsertRestaurant(restaurant?: Restaurant) {
    return () => {
        const state = stateRestaurant.getState();
        state.reset(restaurant ? {...restaurant} : {} as Restaurant);
        router.push('/(tabs)/(restaurants)/restaurant');
    }
}

function getStyles() {
    return StyleSheet.create({
        itemText: {flexGrow: 1, fontWeight: '500'},
    });
}