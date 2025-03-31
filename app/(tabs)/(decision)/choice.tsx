import {Styles, VST} from "@/constants/Styles";
import {FlatList, StyleSheet} from "react-native";
import {Button, Text, ButtonSize, Colors, Dialog, PanningProvider, View} from "react-native-ui-lib";
import {descSortStorage} from "@/store/storage";
import {HapticPressable} from "@/components/ui/HapticPressable";
import {Marker, Person, Restaurant, stateChoicesPeople, statePeople, stateRestaurants} from "@/store/store";
import {SafeThemedView} from "@/components/SafeThemedView";
import {create} from "zustand/react";
import {router} from "expo-router";

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

    function renderItem({item}: { item: Person & Marker }) {
        return <HapticPressable
            onPress={() => {
            }}
            style={[Styles.borderBottom, Styles.rowBtw, Styles.ph5]}
            key={item.key}>
            <Text style={itemTextStyle} $textDefault>{`${item.name}(${item.relation})`}</Text>
            <Text style={itemTextStyle} $textDefault>{`Vetoed: ${item.marker ? 'yes' : 'no'}`}</Text>
        </HapticPressable>;
    }

    function newDiaContent(restaurant: Restaurant | null) {
        let title = 'No restaurants';
        let text = 'Please go to the restaurant page to add a restaurant first!';
        let accept = <></>;
        if (restaurant) {
            text = `this is a ${'⭐️'.repeat(Number(restaurant.rating))} star` +
                ` ${restaurant.cuisine} restaurant with a price rating of` +
                ` ${'$'.repeat(Number(restaurant.price))} that ` +
                ` ${restaurant.delivery.toLocaleLowerCase() === 'yes' ? 'DOES' : 'NOT'} deliver.`;
            title = restaurant.name;
            accept = <Button
                label='Accept'
                backgroundColor={Colors.$backgroundNeutralHeavy}
                borderRadius={14}
                size={ButtonSize.large}
                style={Styles.mb20}
                onPress={() => {
                    showOrHide();
                }}
                color={Colors.$white}/>;
        }
        return <>
            <Text text30 center style={{marginVertical: 25}}>{title}</Text>
            <Text center style={styles.restaurantText}>{text}</Text>
            {accept}
            <Button
                label={restaurant ? 'Veto' : 'Add Restaurant'}
                backgroundColor={Colors.$backgroundNeutralHeavy}
                borderRadius={14}
                size={ButtonSize.large}
                style={Styles.mb20}
                onPress={() => {
                    showOrHide();
                    router.push('/(tabs)/(restaurants)/restaurant')
                }}
                color={Colors.$white}/>
            <View/>
        </>;
    }

    const rest = restaurants?.length > 0 ? restaurants[Math.floor(Math.random() * restaurants.length)] : null;
    return (
        <SafeThemedView style={Styles.hw100}>
            <Dialog
                useSafeArea
                width={'86%'}
                height={'auto'}
                visible={show}
                onDismiss={() => showOrHide()}
                panDirection={PanningProvider.Directions.UP}
                containerStyle={styles.diaContainer}>
                {newDiaContent(rest)}
            </Dialog>
            <Text style={Styles.title}>Choice Screen</Text>
            <FlatList style={[Styles.flexG1, Styles.ph15]} renderItem={renderItem}
                      data={descSortStorage(people.filter(p => choices.hasOwnProperty(p.key))) as (Person & Marker)[]}
                      keyExtractor={({key}) => key}/>
            <Button
                label='Rondomly Choice'
                backgroundColor={Colors.$backgroundNeutralHeavy}
                borderRadius={14}
                size={ButtonSize.large}
                style={Styles.m15}
                labelStyle={Styles.lh30}
                onPress={() => {
                    showOrHide(true);
                }}
                color={Colors.$white}
            />
        </SafeThemedView>);
}

const styles = StyleSheet.create({
    diaContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        borderRadius: 20,
        width: '100%',
        marginTop: '-20%',
        backgroundColor: 'white',
        height: '100%',
        paddingHorizontal: 15,
        paddingVertical: 50,
        overflow: 'hidden',
    },
    restaurantText: {marginBottom: 30, fontSize: 18, lineHeight: 32, paddingHorizontal: 10},
})