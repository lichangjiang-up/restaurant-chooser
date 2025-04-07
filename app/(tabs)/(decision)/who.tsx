import {FlatList} from "react-native";
import {VFull} from "@/components/VFull";
import {Styles} from "@/constants/Styles";
import {Colors, Text, ToastPresets} from "react-native-ui-lib";
import {descSortStorage} from "@/store/storage";
import {router} from "expo-router";
import {useContext} from "react";
import {ToastContext} from "@/components/provider/ToastProvider";
import {Person, stateChoicesPeople, statePeople} from "@/store/state";
import LargeBtn from "@/components/ui/LargeBtn";
import MyCheckbox from "@/components/ui/MyCheckbox";

export default function TabWho() {
    const people = statePeople((state) => state.record);
    const choices = stateChoicesPeople((state) => state.record);
    const state = stateChoicesPeople.getState();

    const renderItem = ({item}: { item: Person }) => <MyCheckbox choice={item.key}
                                                                 label={`${item.name}(${item.relation})`}
                                                                 store={stateChoicesPeople}/>;

    const {showToast} = useContext(ToastContext);

    const handleNextPress = () => {
        const choiceKeys = Object.keys(choices);
        const delKeys = choiceKeys.filter((key) => !people.hasOwnProperty(key));
        state.deleteRecord(...delKeys);

        if (choiceKeys.length - delKeys.length < 1) {
            showToast('Please select least a person', ToastPresets.FAILURE);
            return;
        }
        router.push('/(tabs)/(decision)/pre_filters');
    };

    return (
        <VFull>
            <Text style={Styles.title}>Who's Going?</Text>
            <FlatList
                style={[Styles.flexG1, Styles.ph15]}
                renderItem={renderItem}
                data={descSortStorage(Object.values(people) as Person[])}
                keyExtractor={({key}) => key}
            />
            <LargeBtn label='Next' onPress={handleNextPress} color={Colors.$white}/>
        </VFull>
    );
}
