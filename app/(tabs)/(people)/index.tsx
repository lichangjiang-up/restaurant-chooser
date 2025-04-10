import {FlatList, StyleSheet, Text} from 'react-native';

import {VFull} from "@/components/VFull";
import {router} from "expo-router";
import {Styles} from "@/constants/Styles";
import {ToastPresets} from "react-native-ui-lib";
import {descSortStorage} from "@/store/storage";
import {useContext, useMemo} from "react";
import {ToastContext} from "@/components/provider/ToastProvider";
import {getPersonName, newPerson, Person, stateChoicesPeople, statePeople, statePerson} from "@/store/state";
import {PlatformPressable} from "@react-navigation/elements";
import LargeBtn from "@/components/ui/LargeBtn";

export default function TabPeopleScreen() {
    const peopleRecord = statePeople(state => state.record);
    const people = useMemo(() => Object.values(peopleRecord), [peopleRecord]);

    const {showToast} = useContext(ToastContext);
    const choices = stateChoicesPeople(state => state.record);

    const styles = getStyles();

    function renderItem({item}: { item: Person }) {
        return <PlatformPressable
            onPress={upsertPerson(item)}
            key={item.key}
            style={[Styles.borderBottom, Styles.rowBtw, Styles.p10_8]}>
            <Text style={styles.itemText}>{getPersonName(item)}</Text>
            <LargeBtn
                label='Delete'
                style={Styles.m0}
                disabled={choices.hasOwnProperty(item.key)}
                onPress={() => {
                    statePeople.getState().deleteRecord(item.key);
                    showToast('Person deleted', ToastPresets.OFFLINE);
                }}/>
        </PlatformPressable>;
    }

    return (
        <VFull>
            <FlatList data={descSortStorage(people)}
                      style={[Styles.flexG1, Styles.ph5]}
                      keyExtractor={({key}) => key}
                      renderItem={renderItem}>
            </FlatList>
            <LargeBtn
                label='Add Peron'
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

function getStyles() {
    return StyleSheet.create({
        itemText: {flexGrow: 1, fontWeight: '500'},
    });
}