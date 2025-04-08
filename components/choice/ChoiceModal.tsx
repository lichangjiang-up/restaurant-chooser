import MyModal from "@/components/ui/MyModal";
import {dialogStore} from "@/components/choice/choice_stores";
import ChoiceModalVeto from "@/components/choice/ChoiceModalVeto";
import ChoiceModalRestaurant from "@/components/choice/ChoiceModalRestaurant";
import {useEffect, useMemo} from "react";
import {shuffleArr} from "@/constants/method";
import {filterWithPreFilter, Person, statePreFilter, stateRestaurants} from "@/store/state";


export default function ChoiceModal({choicePeople}: { choicePeople: Person[] }) {
    const restaurantsRecord = stateRestaurants(state => state.record);
    const preFilter = statePreFilter(state => state.obj);
    const restaurants = useMemo(() => shuffleArr(Object.values(restaurantsRecord))
        .filter(filterWithPreFilter(preFilter)), [preFilter, restaurantsRecord]);
    const {modalShowOrHide, vetoShow, show, setRemainingRestaurant, remainingRestaurant} = dialogStore();
    useEffect(() => {
        setRemainingRestaurant(restaurants.length);
    }, [restaurants, setRemainingRestaurant]);

    let restaurant = null;
    if (restaurants?.length > 0 && remainingRestaurant > 0) {
        restaurant = restaurants[restaurants.length - remainingRestaurant];
    }

    const restaurantView = useMemo(() => restaurant ?
        <ChoiceModalRestaurant restaurant={restaurant}/> : <></>, [restaurant]);

    const vetoView = useMemo(() => <ChoiceModalVeto goingPeople={choicePeople}/>, [choicePeople]);

    const modalContent = vetoShow ? vetoView : restaurantView;
    return <MyModal
        onRequestClose={() => modalShowOrHide()}
        visible={show}>{modalContent}
    </MyModal>;
}
