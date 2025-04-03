import {Styles, VST} from "@/constants/Styles";
import {FlatList, StyleSheet, Text, View} from "react-native";
import {descSortStorage} from "@/store/storage";
import {
    newRestaurant,
    Person,
    Restaurant,
    stateChoiceRestaurant,
    stateChoicesPeople,
    statePeople, stateRestaurant,
    stateRestaurants, wrapperRestaurant
} from "@/store/state";
import {create} from "zustand/react";
import {router} from "expo-router";
import {VFull} from "@/components/VFull";
import LargeBtn from "@/components/ui/LargeBtn";
import MyModal from "@/components/ui/MyModal";
import {useContext, useEffect} from "react";
import {Checkbox, ToastPresets} from "react-native-ui-lib";
import {ToastContext} from "@/components/provider/ToastProvider";

type DialogStore = {
    show: boolean;
    modalShowOrHide: (v?: boolean) => void;
    vetoedSet: Set<string>,
    vetoShow: boolean,
    vetoShowHide: (v?: boolean) => void,
    clearVetoedList: () => void,
    addOrDelVeto: (key: string, isDel?: boolean) => void,
}

const dialogStore = create<DialogStore>()((set) => ({
    show: false,
    vetoedSet: new Set<string>(),
    showVetoSet: new Set<string>(),
    vetoShow: false,
    modalShowOrHide: (show) => set(state => {
        const res = {...state, show: !!show};
        if (!res.show) {
            res.vetoShow = false;
        }
        return res;
    }),
    vetoShowHide: (v) => set(state => ({...state, vetoShow: !!v})),
    clearVetoedList: () => set(state => ({...state, vetoedSet: new Set()})),
    addOrDelVeto: (key: string, isDel?: boolean) => set(state => {
        const res = {...state};
        if (isDel) {
            res.vetoedSet.delete(key);
        } else {
            res.vetoedSet.add(key);
        }
        return res;
    }),
}));

export default function TabChoiceScreen() {
    const restaurants = Object.values(stateRestaurants(state => state.v)) as Restaurant[];
    const choices = stateChoicesPeople(state => state.v);
    const people = Object.values(statePeople(state => state.v)) as Person[];
    const itemTextStyle: VST = {fontWeight: 400, fontSize: 16, lineHeight: 50};
    const {show, modalShowOrHide, addOrDelVeto, vetoedSet, clearVetoedList, vetoShow, vetoShowHide} = dialogStore();
    const {showToast} = useContext(ToastContext);
    useEffect(() => {
        modalShowOrHide();
        clearVetoedList();
    }, [modalShowOrHide, clearVetoedList]);

    function renderItem({item}: { item: Person }) {
        return <View
            style={[Styles.borderBottom, Styles.rowBtw, Styles.ph5]}
            key={item.key}>
            <Text style={itemTextStyle}>{`${item.name}(${item.relation})`}</Text>
            <Text style={itemTextStyle}>{`Vetoed: ${vetoedSet.has(item.key) ? 'yes' : 'no'}`}</Text>
        </View>;
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
                    modalShowOrHide();
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
                    if (!restaurant) {
                        modalShowOrHide();
                        stateRestaurant.getState().reset(newRestaurant())
                        router.push('/(tabs)/(restaurants)/restaurant');
                        return;
                    }
                    vetoShowHide(true)
                }}/>
        </>;
    }

    const choicePeople = descSortStorage(people.filter(p => choices.hasOwnProperty(p.key)));
    if (!choicePeople?.length) {
        router.replace('/(tabs)/(decision)/who');
        return <View/>;
    }
    let modalContent = <></>;
    if (vetoShow) {
        function vetoRenderItem({item}: { item: Person }) {
            return <Checkbox
                label={`${item.name}(${item.relation})`}
                labelStyle={{lineHeight: 46, width: '100%'}}
                value={vetoedSet.has(item.key)}
                onValueChange={(v) => addOrDelVeto(item.key, !v)}></Checkbox>;
        }

        modalContent = <>
            <Text style={[Styles.title, {marginVertical: 10}]}>Who Veto?</Text>
            <FlatList data={choicePeople} renderItem={vetoRenderItem} keyExtractor={({key}) => `${key}-v`}/>
            <View style={[Styles.rowBtw, Styles.mv20]}>
                <LargeBtn label='Cancel' style={{marginRight: 10, flex: 1}} backgroundColor={'#AAA'}
                          onPress={() => {
                              clearVetoedList();
                              vetoShowHide();
                          }}/>
                <LargeBtn disabled={!vetoedSet.size} label='Save' style={{marginLeft: 10, flex: 1}} onPress={() => {
                    if (vetoedSet.size < 1) {
                        showToast('Least one have vetoed!', ToastPresets.FAILURE);
                        return;
                    }
                    modalShowOrHide();
                }}/>
            </View>
        </>;
    } else if (show) {
        modalContent = newModalContent(restaurants?.length > 0 && restaurants[Math.floor(Math.random() * restaurants.length)]);
    }
    return <VFull>
        <MyModal
            visible={show}>
            {modalContent}
        </MyModal>
        <Text style={Styles.title}>Choice Screen</Text>
        <FlatList style={[Styles.flexG1, {paddingHorizontal: 10}]} renderItem={renderItem}
                  data={choicePeople}
                  keyExtractor={({key}) => key}/>
        <LargeBtn
            label='Rondomly Choice'
            onPress={() => {
                modalShowOrHide(true);
                clearVetoedList();
            }}/>
    </VFull>;
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