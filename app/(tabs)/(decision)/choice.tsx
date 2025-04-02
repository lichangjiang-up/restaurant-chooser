import {Styles, VST} from "@/constants/Styles";
import {FlatList, Modal, Pressable, StyleSheet, Text, View} from "react-native";
import {descSortStorage} from "@/store/storage";
import {
    Marker,
    methodRestaurant,
    Person,
    Restaurant,
    stateChoiceRestaurant,
    stateChoicesPeople,
    statePeople,
    stateRestaurants
} from "@/store/store";
import {create} from "zustand/react";
import {router} from "expo-router";
import {VSafe} from "@/components/VSafe";
import {PlatformPressable} from "@react-navigation/elements";
import LargeBtn from "@/components/ui/LargeBtn";

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
        return <PlatformPressable
            onPress={() => {
            }}
            style={[Styles.borderBottom, Styles.rowBtw, Styles.ph5]}
            key={item.key}>
            <Text style={itemTextStyle}>{`${item.name}(${item.relation})`}</Text>
            <Text style={itemTextStyle}>{`Vetoed: ${item.marker ? 'yes' : 'no'}`}</Text>
        </PlatformPressable>;
    }

    function newDiaContent(restaurant: Restaurant | null) {
        let title = 'No restaurants';
        let text = 'Please go to the restaurant page to add a restaurant first!';
        let accept = <></>;
        if (restaurant?.key) {
            restaurant = methodRestaurant(restaurant);
            text = `This is a ${restaurant.getHint('rating')} star` +
                ` ${restaurant.cuisine} restaurant with a price rating of` +
                ` ${restaurant.getHint('price')} that ` +
                ` ${restaurant.getHint('delivery')}.`;
            title = restaurant.name;
            accept = <LargeBtn
                label='Accept'
                style={Styles.mb20}
                onPress={() => {
                    showOrHide();
                    restaurant && stateChoiceRestaurant.getState().reset(restaurant);
                    router.push('/(tabs)/(decision)/enjoy');
                }}/>;
        }
        return <>
            <Text style={Styles.title}>{title}</Text>
            <Text style={styles.restaurantText}>{text}</Text>
            {accept}
            <LargeBtn
                label={restaurant?.key ? 'Veto' : 'Add Restaurant'}
                style={Styles.mb20}
                onPress={() => {
                    showOrHide();
                    if (!restaurant) {
                        router.push('/(tabs)/(restaurants)/restaurant');
                    }
                }}/>
        </>;
    }

    const rest = restaurants?.length > 0 ? restaurants[Math.floor(Math.random() * restaurants.length)] : null;
    return <VSafe>
        <Modal
            visible={show}
            statusBarTranslucent={true}
            transparent={true}
            onRequestClose={() => showOrHide()}
            onDismiss={() => showOrHide()}>
            <Pressable onPress={() => showOrHide()} style={[Styles.hw100, styles.modalBg]}>
                <View style={styles.modalContent}>
                    {newDiaContent(rest)}
                </View>
            </Pressable>
        </Modal>
        <View style={Styles.hw100}>
            <Text style={Styles.title}>Choice Screen</Text>
            <FlatList style={[Styles.flexG1, Styles.ph15]} renderItem={renderItem}
                      data={descSortStorage(people.filter(p => choices.hasOwnProperty(p.key))) as (Person & Marker)[]}
                      keyExtractor={({key}) => key}/>
            <LargeBtn
                label='Rondomly Choice'
                onPress={() => showOrHide(true)}/>
        </View>
    </VSafe>;
}

const styles = StyleSheet.create({
    restaurantText: {
        marginBottom: 26,
        fontSize: 18,
        lineHeight: 30,
        paddingHorizontal: 10,
        textAlign: 'center'
    },
    modalBg: {
        backgroundColor: '#000000AA',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalContent: {
        width: '86%',
        height: 'auto',
        marginTop: '-20%',
        backgroundColor: 'white',
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
});