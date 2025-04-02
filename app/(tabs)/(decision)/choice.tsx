import {Styles, VST} from "@/constants/Styles";
import {Button, FlatList, Modal, StyleSheet, Text, View} from "react-native";
import {descSortStorage} from "@/store/storage";
import {HapticPressable} from "@/components/ui/HapticPressable";
import {
    Marker,
    Person,
    Restaurant,
    stateChoiceRestaurant,
    stateChoicesPeople,
    statePeople,
    stateRestaurants
} from "@/store/store";
import {create} from "zustand/react";
import {router} from "expo-router";
import {SafeContainer} from "@/components/SafeContainer";

type DialogStore = {
    show: boolean;
    showOrHide: (v?: boolean) => void;
}

const dialogStore = create<DialogStore>()((set) => ({
    show: false,
    showOrHide: (show) => set(_ => ({show: !!show})),
}))

export default function TabChoiceScreen() {
    const restaurants = Object.values(stateRestaurants(state => state.v)) as Restaurant[];
    const choices = stateChoicesPeople(state => state.v);
    const people = Object.values(statePeople(state => state.v)) as Person[];
    const itemTextStyle: VST = {fontWeight: 400, fontSize: 16, lineHeight: 50};
    const {show, showOrHide} = dialogStore();

    function renderItem({item}: { item: Person & Marker, index: number }) {
        return <HapticPressable
            onPress={() => {
            }}
            style={[Styles.borderBottom, Styles.rowBtw, Styles.ph5]}
            key={item.key}>
            <Text style={itemTextStyle}>{`${item.name}(${item.relation})`}</Text>
            <Text style={itemTextStyle}>{`Vetoed: ${item.marker ? 'yes' : 'no'}`}</Text>
        </HapticPressable>;
    }

    function newDiaContent(restaurant: Restaurant | null) {
        let title = 'No restaurants';
        let text = 'Please go to the restaurant page to add a restaurant first!';
        let accept = <></>;
        if (restaurant) {
            text = `This is a ${restaurant.getHint('rating')} star` +
                ` ${restaurant.cuisine} restaurant with a price rating of` +
                ` ${restaurant.getHint('price')} that ` +
                ` ${restaurant.getHint('delivery')}.`;
            title = restaurant.name;
            accept = <Button
                title='Accept'
                onPress={() => {
                    showOrHide();
                    stateChoiceRestaurant.getState().reset(restaurant);
                    router.push('/(tabs)/(decision)/enjoy');
                }}/>;
        }
        return <>
            <Text style={{marginVertical: 25}}>{title}</Text>
            <Text style={styles.restaurantText}>{text}</Text>
            {accept}
            <Button
                title={restaurant?.key ? 'Veto' : 'Add Restaurant'}
                onPress={() => {
                    showOrHide();
                    if (!restaurant) {
                        router.push('/(tabs)/(restaurants)/restaurant');
                    }
                }}/>
        </>;
    }

    const rest = restaurants?.length > 0 ? restaurants[Math.floor(Math.random() * restaurants.length)] : null;
    return <SafeContainer>
        <Modal
            visible={show}
            onDismiss={() => showOrHide()}>
            {newDiaContent(rest)}
        </Modal>
        <View style={Styles.hw100}>
            <Text style={Styles.title}>Choice Screen</Text>
            <FlatList style={[Styles.flexG1, Styles.ph15]} renderItem={renderItem}
                      data={descSortStorage(people.filter(p => choices.hasOwnProperty(p.key))) as (Person & Marker)[]}
                      keyExtractor={({key}) => key}/>
            <Button
                title='Rondomly Choice'
                onPress={() => showOrHide(true)}/>
        </View>
    </SafeContainer>;
}

const styles = StyleSheet.create({
    restaurantText: {marginBottom: 30, fontSize: 18, lineHeight: 32, paddingHorizontal: 10},
});