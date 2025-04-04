import {FlatList, Text} from 'react-native';

import {router} from "expo-router";
import {Styles} from "@/constants/Styles";
import {descSortStorage} from "@/store/storage";
import {newRestaurant, Restaurant, stateChoiceRestaurant, stateRestaurant, stateRestaurants} from "@/store/state";
import {PlatformPressable} from "@react-navigation/elements";
import {useContext} from "react";
import {ToastContext} from "@/components/provider/ToastProvider";
import {ToastPresets} from "react-native-ui-lib";
import LargeBtn from '@/components/ui/LargeBtn';
import {VFull} from "@/components/VFull";

export default function TabRestaurantsScreen() {
    const restaurants = Object.values(stateRestaurants(state => state.record)) as Restaurant[];
    const {showToast} = useContext(ToastContext);
    const restaurant = stateChoiceRestaurant(state => state.obj);

    function renderItem({item}: { item: Restaurant }) {
        return <PlatformPressable
            style={[Styles.borderBottom, Styles.rowBtw, Styles.p10_8]}
            key={item.key}
            onPress={upsertRestaurant(item)}>
            <Text style={Styles.itemText}>{item.name || item.key}</Text>
            <LargeBtn
                label='Delete'
                disabled={item.key === restaurant?.key}
                style={Styles.m0}
                onPress={() => {
                    stateRestaurants.getState().deleteRecord(item.key);
                    showToast('Restaurant deleted', ToastPresets.OFFLINE);
                }}/>
        </PlatformPressable>
    }


    return (
        <VFull>
            <FlatList data={descSortStorage(restaurants)}
                      style={[Styles.flexG1]}
                      keyExtractor={({key}) => key}
                      renderItem={renderItem}>
            </FlatList>
            <LargeBtn
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
