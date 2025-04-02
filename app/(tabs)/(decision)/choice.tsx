import {Styles, VST} from "@/constants/Styles";
import {FlatList, StyleSheet, Text} from "react-native";
import {descSortStorage} from "@/store/storage";
import {
    Marker,
    Person,
    Restaurant,
    stateChoiceRestaurant,
    stateChoicesPeople,
    statePeople,
    stateRestaurants, wrapperRestaurant
} from "@/store/state";
import {create} from "zustand/react";
import {router} from "expo-router";
import {VSafe} from "@/components/VSafe";
import {PlatformPressable} from "@react-navigation/elements";
import LargeBtn from "@/components/ui/LargeBtn";
import MyModal from "@/components/ui/MyModal";
import {useEffect} from "react";

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

    useEffect(() => {
        showOrHide();
    }, []);

    function renderItem({item}: { item: Person & Marker, index: number }) {
        return <PlatformPressable
            onPress={() => {
            }}
            style={[Styles.borderBottom, Styles.rowBtw, Styles.ph5]}
            key={item.key}>
            <Text style={itemTextStyle}>{`${item.name}(${item.relation})`}</Text>
            <Text style={itemTextStyle}>{`Vetoed: ${item.marker ? 'yes' : 'no'}`}</Text>
        </PlatformPressable>;
    }

    function newModalContent(restaurant: Restaurant | false) {
        let title = 'No restaurants';
        let text = 'Please go to the restaurant page to add a restaurant first!';
        let accept = <></>;
        if (restaurant) {
            text = getRestaurantText(restaurant);
            title = restaurant.name;
            accept = <LargeBtn
                label='Accept'
                style={Styles.mb20}
                onPress={() => {
                    // showOrHide();
                    restaurant && stateChoiceRestaurant.getState().reset(restaurant);
                    router.replace('/(tabs)/(decision)/enjoy');
                }}/>;
        }
        return <>
            <Text style={Styles.title}>{title}</Text>
            <Text style={styles.restaurantText}>{text}</Text>
            {accept}
            <LargeBtn
                label={restaurant ? 'Veto' : 'Add Restaurant'}
                style={Styles.mb20}
                onPress={() => {
                    showOrHide();
                    if (!restaurant) {
                        router.push('/(tabs)/(restaurants)/restaurant');
                    }
                }}/>
        </>;
    }

    return <VSafe>
        <MyModal
            visible={show}
            onPress={() => showOrHide()}
            onDismiss={() => showOrHide()}>
            {newModalContent(restaurants?.length > 0 && restaurants[Math.floor(Math.random() * restaurants.length)])}
        </MyModal>
        <Text style={Styles.title}>Choice Screen</Text>
        <FlatList style={[Styles.flexG1, {paddingHorizontal: 10}]} renderItem={renderItem}
                  data={descSortStorage(people.filter(p => choices.hasOwnProperty(p.key))) as (Person & Marker)[]}
                  keyExtractor={({key}) => key}/>
        <LargeBtn
            label='Rondomly Choice'
            onPress={() => showOrHide(true)}/>
    </VSafe>;
}

function getRestaurantText(restaurant: Restaurant) {
    restaurant = wrapperRestaurant(restaurant);
    return `This is a ${restaurant.getHint('rating')} star` +
        ` ${restaurant.cuisine} restaurant with a price rating of` +
        ` ${restaurant.getHint('price')} that ` +
        ` ${restaurant.getHint('delivery')}.`;
}

const styles = StyleSheet.create({
    restaurantText: {
        marginBottom: 26,
        fontSize: 18,
        lineHeight: 30,
        paddingHorizontal: 10,
        textAlign: 'center'
    }
});