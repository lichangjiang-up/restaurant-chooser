import MyModal from "@/components/ui/MyModal";
import {dialogStore} from "@/components/choice/choice_stores";
import ChoiceModalVeto from "@/components/choice/ChoiceModalVeto";
import ChoiceModalRestaurant from "@/components/choice/ChoiceModalRestaurant";
import {useEffect, useMemo} from "react";
import {shuffleArr} from "@/constants/method";
import {Person, stateChoicesRestaurants, stateRestaurants} from "@/store/state";


export default function ChoiceModal({choicePeople}: { choicePeople: Person[] }) {
    const choicesRestaurantsRecord = stateChoicesRestaurants(state => state.record);
    const restaurantsRecord = stateRestaurants(state => state.record);

    const restaurants = useMemo(() => shuffleArr(Object.values(restaurantsRecord))
        .filter(r => choicesRestaurantsRecord.hasOwnProperty(r.key)), [choicesRestaurantsRecord, restaurantsRecord]);
    const {modalShowOrHide, vetoShow, show, setRemainingRestaurant, remainingRestaurant} = dialogStore();

    useEffect(() => {
        setRemainingRestaurant(restaurants.length);
    }, [restaurants, setRemainingRestaurant]);

    let modalContent = <></>;
    if (vetoShow) {
        modalContent =
            <ChoiceModalVeto goingPeople={choicePeople}/>;
    } else if (show) {
        let restaurant = null;
        if (restaurants?.length > 0 && remainingRestaurant > 0) {
            restaurant = restaurants[restaurants.length - remainingRestaurant];
        }
        modalContent = <ChoiceModalRestaurant restaurant={restaurant}/>
    }
    return <MyModal
        onRequestClose={() => modalShowOrHide()}
        onDismiss={() => setRemainingRestaurant(remainingRestaurant - 1)}
        visible={show}>{modalContent}
    </MyModal>
}
