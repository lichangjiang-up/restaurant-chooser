import {FlatList, Text} from 'react-native';

import {router} from "expo-router";
import {Styles} from "@/constants/Styles";
import {descSortStorage} from "@/store/storage";
import {newRestaurant, Restaurant, stateRestaurant, stateRestaurants} from "@/store/store";
import {SafeAreaView} from "react-native-safe-area-context";
import {PlatformPressable} from "@react-navigation/elements";
import {useContext} from "react";
import {ToastContext} from "@/components/provider/ToastProvider";
import {Button, ButtonSize, Colors, ToastPresets} from "react-native-ui-lib";

export default function TabRestaurantsScreen() {
    const restaurants = Object.values(stateRestaurants(state => state.v)) as Restaurant[];
    const {showToast} = useContext(ToastContext);

    function renderItem({item}: { item: Restaurant }) {
        return <PlatformPressable
            style={[Styles.borderBottom, Styles.rowBtw, Styles.p10_8]}
            key={item.key}
            onPress={upsertRestaurant(item)}>
            <Text style={Styles.itemText}>{item.name || item.key}</Text>
            <Button backgroundColor={Colors.$backgroundNeutralHeavy}
                    color={Colors.$white}
                    label='Delete'
                    labelStyle={Styles.lh30}
                    size={ButtonSize.large}
                    borderRadius={14}
                    onPress={() => {
                        stateRestaurants.getState().delete(item.key);
                        showToast('Restaurant deleted', ToastPresets.OFFLINE);
                    }}/>
        </PlatformPressable>
    }


    return (
        <SafeAreaView style={Styles.hw100}>
            <FlatList data={descSortStorage(restaurants)}
                      style={[Styles.flexG1]}
                      keyExtractor={({key}) => key}
                      renderItem={renderItem}>
            </FlatList>
            <Button
                label='Add Peron'
                backgroundColor={Colors.$backgroundNeutralHeavy}
                borderRadius={14}
                size={ButtonSize.large}
                style={Styles.m15}
                labelStyle={Styles.lh30}
                onPress={upsertRestaurant()}
                color={Colors.$white}
            />
        </SafeAreaView>
    );
}

function upsertRestaurant(restaurant?: Restaurant) {
    return () => {
        const state = stateRestaurant.getState();
        state.reset(restaurant ? {...restaurant} : newRestaurant());
        router.push('/(tabs)/(restaurants)/restaurant');
    }
}
