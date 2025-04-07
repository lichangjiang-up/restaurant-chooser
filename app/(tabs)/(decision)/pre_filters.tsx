import {ScrollView, Text} from "react-native";
import {Styles} from "@/constants/Styles";
import LargeBtn from "@/components/ui/LargeBtn";
import {
    CUISINES,
    LEVELS,
    PreFilter,
    stateChoicesRestaurants,
    statePreFilter,
    stateRestaurants,
    YES_OR_NO
} from "@/store/state";
import {PickerModes} from "react-native-ui-lib";
import {router} from "expo-router";
import MyPiker, {newValueLabel, ValueLabel} from "@/components/ui/MyPiker";
import {useMemo} from "react";


export default function TabPreFiltersScreen() {
    const {obj, objUpdate} = statePreFilter();
    const restaurantsRecord = stateRestaurants(state => state.record);
    const restaurants = useMemo(() => Object.values(restaurantsRecord), [restaurantsRecord]);

    function getPicker(key: keyof PreFilter, valueLabels: ValueLabel[]) {
        return <MyPiker
            valueLabels={valueLabels}
            key={key}
            mode={PickerModes.MULTI}
            value={obj[key] || []}
            keyName={key}
            onChange={(v) => {
                objUpdate(key, (v as string[]).sort());
            }}/>;
    }

    const choiceRestaurants = restaurants.filter(restaurant =>
        obj.price?.includes(restaurant.price)
        && obj.rating?.includes(restaurant.rating)
        && obj.delivery?.includes(restaurant.delivery)
        && obj.cuisines?.includes(restaurant.cuisine)).map(restaurant => [restaurant.key, null]);


    return <ScrollView style={Styles.hw100} contentContainerStyle={Styles.p10}>
        <Text style={Styles.title}>Restaurant Filter</Text>
        {getPicker('cuisines', newValueLabel(CUISINES))}
        {getPicker('price', newValueLabel(LEVELS))}
        {getPicker('rating', newValueLabel(LEVELS))}
        {getPicker('delivery', newValueLabel(YES_OR_NO))}
        <LargeBtn
            style={Styles.mv20}
            disabled={choiceRestaurants.length < 1}
            label={`Next(${choiceRestaurants.length})`}
            onPress={() => {
                stateChoicesRestaurants.getState().resetRecord(Object.fromEntries(choiceRestaurants));
                router.push('/(tabs)/(decision)/choice');
            }}
        />
    </ScrollView>
}