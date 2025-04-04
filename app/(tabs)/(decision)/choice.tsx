import {Styles} from "@/constants/Styles";
import {FlatList, StyleSheet, Text, View} from "react-native";
import {descSortStorage} from "@/store/storage";
import {
    newRecordStore,
    newRestaurant,
    Person,
    Restaurant,
    stateChoiceRestaurant,
    stateChoicesPeople,
    statePeople,
    stateRestaurant,
    stateRestaurants,
    wrapperRestaurant
} from "@/store/state";
import {create} from "zustand/react";
import {router} from "expo-router";
import {VFull} from "@/components/VFull";
import LargeBtn from "@/components/ui/LargeBtn";
import MyModal from "@/components/ui/MyModal";
import {useContext, useEffect} from "react";
import {ToastPresets} from "react-native-ui-lib";
import {ToastContext} from "@/components/provider/ToastProvider";
import MyCheckbox from "@/components/ui/MyCheckbox";

type DialogStore = {
    show: boolean;
    modalShowOrHide: (v?: boolean) => void;
    vetoShow: boolean;
    vetoShowHide: (v?: boolean) => void;
};

const dialogStore = create<DialogStore>()((set) => ({
    show: false,
    vetoShow: false,
    modalShowOrHide: (show) => set(state => {
        const res = {...state, show: !!show};
        if (!res.show) {
            res.vetoShow = false;
        }
        return res;
    }),
    vetoShowHide: (v) => set(state => ({...state, vetoShow: !!v})),
}));

const vetoedRecordStore = newRecordStore<string, null>();

export default function TabChoiceScreen() {
    const {showToast} = useContext(ToastContext);

    const restaurants = Object.values(stateRestaurants(state => state.record)) as Restaurant[];
    const choices = stateChoicesPeople(state => state.record);
    const people = Object.values(statePeople(state => state.record)) as Person[];
    const {show, modalShowOrHide, vetoShow, vetoShowHide} = dialogStore();
    const {record, clearRecord} = vetoedRecordStore();
    const recordSize = Object.keys(record).length;

    useEffect(() => {
        modalShowOrHide();
        clearRecord();
    }, [modalShowOrHide, clearRecord]);

    const renderItem = ({item}: { item: Person }) => (
        <View style={[Styles.borderBottom, Styles.rowBtw, Styles.ph5]} key={item.key}>
            <Text style={styles.itemText}>{`${item.name}(${item.relation})`}</Text>
            <Text style={styles.itemText}>{`Vetoed: ${record.hasOwnProperty(item.key) ? 'yes' : 'no'}`}</Text>
        </View>
    );

    const newModalContent = (restaurant: Restaurant | false) => {
        let title = 'No restaurants';
        let text = 'Please go to the restaurant page to add a restaurant first!';
        let accept = <></>;

        if (restaurant) {
            text = getRestaurantText(restaurant);
            title = restaurant.name;
            accept = (
                <LargeBtn
                    label='Accept'
                    style={Styles.mb20}
                    onPress={() => {
                        modalShowOrHide();
                        if (restaurant) {
                            stateChoiceRestaurant.getState().objReset(restaurant);
                            router.replace('/(tabs)/(decision)/enjoy');
                        } else if (router.canGoBack()) {
                            router.back();
                        }
                    }}
                />
            );
        }

        return (
            <>
                <Text style={Styles.title}>{title}</Text>
                <Text style={styles.restaurantText}>{text}</Text>
                {accept}
                <LargeBtn
                    label={restaurant ? 'Veto' : 'Add Restaurant'}
                    style={Styles.mb20}
                    onPress={() => {
                        if (!restaurant) {
                            modalShowOrHide();
                            stateRestaurant.getState().objReset(newRestaurant());
                            router.push('/(tabs)/(restaurants)/restaurant');
                            return;
                        }
                        vetoShowHide(true);
                    }}
                />
            </>
        );
    };

    const choicePeople = descSortStorage(people.filter(p => choices.hasOwnProperty(p.key)));
    let modalContent = <></>;
    const disabledBtn = !choicePeople?.length;

    if (vetoShow) {
        const vetoRenderItem = ({item}: { item: Person }) => (<MyCheckbox
            choice={item.key}
            store={vetoedRecordStore}
            label={`${item.name}(${item.relation})`}
            lineHeight={46}
        />);

        modalContent = (<>
                <Text style={[Styles.title, {marginVertical: 10}]}>Who Veto?</Text>
                <FlatList
                    data={choicePeople}
                    renderItem={vetoRenderItem}
                    keyExtractor={({key}) => `${key}-v`}
                />
                <View style={[Styles.rowBtw, Styles.mv20]}>
                    <LargeBtn
                        disabled={disabledBtn}
                        label='Cancel'
                        style={styles.vetoBtn}
                        backgroundColor={'#AAA'}
                        onPress={() => {
                            clearRecord();
                            vetoShowHide();
                        }}
                    />
                    <LargeBtn
                        disabled={!recordSize || disabledBtn}
                        label='Save'
                        style={styles.vetoBtn}
                        onPress={() => {
                            if (recordSize < 1) {
                                showToast('Least one have vetoed!', ToastPresets.FAILURE);
                                return;
                            }
                            modalShowOrHide();
                        }}
                    />
                </View>
            </>
        );
    } else if (show) {
        const randomRestaurant = restaurants?.length > 0 && restaurants[Math.floor(Math.random() * restaurants.length)];
        modalContent = newModalContent(randomRestaurant);
    }

    return (
        <VFull>
            <MyModal onRequestClose={() => modalShowOrHide()} visible={show}>{modalContent}</MyModal>
            <Text style={Styles.title}>Choice Screen</Text>
            <FlatList
                style={[Styles.flexG1, {paddingHorizontal: 10}]}
                renderItem={renderItem}
                data={choicePeople}
                keyExtractor={({key}) => key}
            />
            <LargeBtn
                disabled={disabledBtn}
                label='Rondomly Choice'
                onPress={() => {
                    modalShowOrHide(true);
                    clearRecord();
                }}
            />
        </VFull>
    );
}

const getRestaurantText = (restaurant: Restaurant) => {
    restaurant = wrapperRestaurant(restaurant);
    return `This is a ${restaurant.getHint('rating')} star` +
        ` ${restaurant.cuisine} restaurant with a price rating of` +
        ` ${restaurant.getHint('price')} that ` +
        ` ${restaurant.getHint('delivery')}.`;
};

const styles = StyleSheet.create({
    restaurantText: {
        marginBottom: 26,
        fontSize: 18,
        lineHeight: 30,
        paddingHorizontal: 10,
        textAlign: 'center'
    },
    itemText: {fontWeight: 400, fontSize: 16, lineHeight: 50},
    vetoBtn: {marginLeft: 10, flex: 1},
});