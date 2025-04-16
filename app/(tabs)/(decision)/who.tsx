import {FlatList, Text} from "react-native";
import {VFull} from "@/components/VFull";
import {Styles} from "@/constants/Styles";
import {descSortStorage} from "@/store/storage";
import {router} from "expo-router";
import {useMemo} from "react";
import {getPersonNameRelation, Person, stateChoicesPeople, statePeople, toRecord} from "@/store/state";
import MyBtn from "@/components/ui/MyBtn";
import MyCheckbox from "@/components/ui/MyCheckbox";

export default function TabWho() {
    const people = statePeople((state) => state.record);
    const choices = stateChoicesPeople((state) => state.record);
    const state = stateChoicesPeople.getState();

    const renderItem = ({item}: { item: Person }) => <MyCheckbox choice={item.key}
                                                                 label={getPersonNameRelation(item)}
                                                                 store={stateChoicesPeople}/>;

    const peopleSorted = useMemo(() => descSortStorage(Object.values(people) as Person[]), [people]);
    const choicesValues = useMemo(() => Object.keys(choices).filter(key => people.hasOwnProperty(key)), [people, choices]);
    const handleNextPress = () => {
        state.resetRecord(toRecord(choicesValues, null));
        router.push('/(tabs)/(decision)/pre_filters');
    };

    return (
        <VFull>
            <Text style={Styles.title}>Who's Going?</Text>
            <FlatList
                style={[Styles.flex1, Styles.ph15]}
                renderItem={renderItem}
                data={peopleSorted}
                keyExtractor={({key}) => key}
            />
            <MyBtn disabled={!choicesValues.length} label={`Next(${choicesValues.length})`} onPress={handleNextPress}/>
        </VFull>
    );
}
