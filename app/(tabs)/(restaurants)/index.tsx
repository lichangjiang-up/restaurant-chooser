import {FlatList, Text} from 'react-native';

import {router} from "expo-router";
import {Styles} from "@/constants/Styles";
import {descSortStorage} from "@/store/storage";
import {newRestaurant, Restaurant, stateRestaurant, stateRestaurants} from "@/store/state";
import {PlatformPressable} from "@react-navigation/elements";
import {useMemo} from "react";
import MyBtn from '@/components/ui/MyBtn';
import {VFull} from "@/components/VFull";

export default function TabRestaurantsScreen() {

    const restaurantsRecord = stateRestaurants(state => state.record);
    const restaurants = useMemo(() => Object.values(restaurantsRecord), [restaurantsRecord]);


    function renderItem({item}: { item: Restaurant }) {
        return <PlatformPressable
            style={[Styles.borderBottom, Styles.rowBtw, Styles.p10_8]}
            key={item.key}
            onPress={upsertRestaurant(item)}>
            <Text style={Styles.itemText}>{item.name || item.key}</Text>
            <MyBtn
                label='Delete'
                style={Styles.m0}
                onPress={() => {
                    stateRestaurants.getState().deleteRecord(item.key);
                }}/>
        </PlatformPressable>
    }


    return (
        <VFull>
            <FlatList data={descSortStorage(restaurants)}
                      style={[Styles.flex1]}
                      keyExtractor={({key}) => key}
                      renderItem={renderItem}>
            </FlatList>
            <MyBtn
                label='Add Restaurant'
                onPress={upsertRestaurant()}
            />
        </VFull>
    );
}

function upsertRestaurant(restaurant?: Restaurant) {
    return () => {
        stateRestaurant.getState().objReset(newRestaurant(restaurant));
        router.push('/(tabs)/(restaurants)/restaurant');
    }
}
