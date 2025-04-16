import {Styles} from "@/constants/Styles";
import {FlatList, StyleSheet, Text, View} from "react-native";
import {descSortStorage} from "@/store/storage";
import {
    getPersonNameRelation,
    Person,
    stateChoicesPeople, statePeople
} from "@/store/state";
import {VFull} from "@/components/VFull";
import MyBtn from "@/components/ui/MyBtn";
import {useEffect, useMemo} from "react";
import ChoiceModal from "@/components/choice/ChoiceModal";
import {dialogStore, vetoedRecordStore} from "@/components/choice/choice_stores";


export default function TabChoiceScreen() {
    const choicesPeople = stateChoicesPeople(state => state.record);
    const peopleRecord = statePeople(state => state.record);
    const people = useMemo(() => Object.values(peopleRecord), [peopleRecord]);

    const {modalShowOrHide, remainingRestaurant} = dialogStore();
    const {record, clearRecord} = vetoedRecordStore();

    useEffect(() => {
        modalShowOrHide();
        clearRecord();
    }, [modalShowOrHide, clearRecord]);

    const renderItem = ({item}: { item: Person }) => (
        <View style={[Styles.borderBottom, Styles.rowBtw, Styles.ph5]} key={item.key}>
            <Text style={styles.itemText}>{getPersonNameRelation(item)}</Text>
            <Text style={styles.itemText}>{`Vetoed: ${record.hasOwnProperty(item.key) ? 'yes' : 'no'}`}</Text>
        </View>
    );
    const choicePeople = useMemo(() => descSortStorage(people.filter(p => choicesPeople.hasOwnProperty(p.key))), [people, choicesPeople]);

    return (
        <VFull>
            <ChoiceModal choicePeople={choicePeople}/>
            <Text style={Styles.title}>Choice Screen</Text>
            <FlatList
                style={[Styles.flex1, {paddingHorizontal: 10}]}
                renderItem={renderItem}
                data={choicePeople}
                keyExtractor={({key}) => key}
            />
            <MyBtn
                disabled={!choicePeople?.length}
                label={`Randomly Choice(${remainingRestaurant})`}
                onPress={() => {
                    modalShowOrHide(true);
                    clearRecord();
                }}
            />
        </VFull>
    );
}


const styles = StyleSheet.create({
    itemText: {fontWeight: 400, fontSize: 16, lineHeight: 50},
});