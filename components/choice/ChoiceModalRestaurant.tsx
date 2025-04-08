import {newRestaurant, Restaurant, stateChoiceRestaurant, stateRestaurant, wrapperRestaurant} from "@/store/state";
import LargeBtn from "../ui/LargeBtn";
import {Styles} from "@/constants/Styles";
import {router} from "expo-router";
import {StyleSheet, Text} from "react-native";
import {dialogStore} from "@/components/choice/choice_stores";

export type ChoiceModalRestaurantProps = { restaurant: Restaurant | null }

export default function ChoiceModalRestaurant({restaurant}: ChoiceModalRestaurantProps) {
    const {modalShowOrHide, vetoShowHide} = dialogStore();

    let title = 'No restaurants';
    let text = 'Please reselect or go to the restaurant page to add a restaurant first!';
    if (restaurant) {
        text = getRestaurantText(restaurant);
        title = restaurant.name;
    }

    return (
        <>
            <Text style={Styles.title}>{title}</Text>
            <Text style={styles.restaurantText}>{text}</Text>
            <LargeBtn
                label={restaurant ? 'Accept' : 'Reselect'}
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
});
