import {FlatList, Text} from 'react-native';

import {VFull} from "@/components/VFull";
import {router} from "expo-router";
import {Styles} from "@/constants/Styles";
import {descSortStorage} from "@/store/storage";
import {useMemo} from "react";
import {getPersonName, newPerson, Person, stateChoicesPeople, statePeople, statePerson} from "@/store/state";
import {PlatformPressable} from "@react-navigation/elements";
import MyBtn from "@/components/ui/MyBtn";

export default function TabPeopleScreen() {
    const peopleRecord = statePeople(state => state.record);
    const people = useMemo(() => Object.values(peopleRecord), [peopleRecord]);

    const choices = stateChoicesPeople(state => state.record);

    function renderItem({item}: { item: Person }) {
        return <PlatformPressable
            onPress={upsertPerson(item)}
            key={item.key}
            style={[Styles.borderBottom, Styles.rowBtw, Styles.p10_8, Styles.gap20]}>
            <Text numberOfLines={2} style={[Styles.itemText, Styles.flex1]}>{getPersonName(item)}</Text>
            <MyBtn
                label='Delete'
                style={Styles.m0}
                disabled={choices.hasOwnProperty(item.key)}
                onPress={() => {
                    statePeople.getState().deleteRecord(item.key);
                }}/>
        </PlatformPressable>;
    }

    return (
        <VFull>
            <FlatList data={descSortStorage(people)}
                      style={[Styles.flex1, Styles.ph5]}
                      keyExtractor={({key}) => key}
                      renderItem={renderItem}>
            </FlatList>
            <MyBtn
                label='Add Person'
                onPress={upsertPerson()}
            />
        </VFull>
    );
}

function upsertPerson(person?: Person) {
    return () => {
        statePerson.getState().objReset(Object.assign(newPerson(person)));
        router.push('/(tabs)/(people)/person');
    }
}