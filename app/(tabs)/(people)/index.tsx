import {FlatList, StyleSheet} from 'react-native';

import {SafeThemedView} from "@/components/SafeThemedView";
import {router} from "expo-router";
import {Styles} from "@/constants/Styles";
import {Button, ButtonSize, Colors, Text, View} from "react-native-ui-lib";
import {descSortStorage, initStorageAbs, StorageAbs} from "@/store/storage";
import {useContext} from "react";
import {ToastContext} from "@/components/provider/ToastProvider";
import {HapticPressable} from "@/components/ui/HapticPressable";
import {Person, statePeople, statePerson} from "@/store/store";

export default function TabPeopleScreen() {
    const people = Object.values(statePeople(state => state.v)) as Person[];
    const {showToast} = useContext(ToastContext);

    const styles = getStyles();

    function renderItem({item}: { item: Person }) {
        return <HapticPressable
            onPress={upsertPerson(item)}
            key={item.key}>
            <View
                style={[Styles.borderBottom, Styles.rowBtw, Styles.p10_8]}>
                <Text style={styles.itemText} $textDefault>{item.name || item.key}</Text>
                <Button backgroundColor={Colors.$backgroundNeutralHeavy}
                        color={Colors.$white}
                        label='Delete'
                        labelStyle={Styles.lh30}
                        size={ButtonSize.large}
                        borderRadius={14}
                        onPress={() => {
                            statePeople.getState().delete(item.key);
                            showToast('Person deleted');
                        }}/>
            </View>
        </HapticPressable>;
    }

    return (
        <SafeThemedView style={Styles.hw100}>
            <FlatList data={descSortStorage(people)}
                      style={[Styles.flexG1, Styles.ph5]}
                      keyExtractor={({key}) => key}
                      renderItem={renderItem}>
            </FlatList>
            <Button
                label='Add Peron'
                backgroundColor={Colors.$backgroundNeutralHeavy}
                borderRadius={14}
                size={ButtonSize.large}
                style={Styles.m15}
                labelStyle={Styles.lh30}
                onPress={upsertPerson()}
                color={Colors.$white}
            />
        </SafeThemedView>
    );
}

function upsertPerson(person?: Person) {
    return () => {
        statePerson.getState().reset(initStorageAbs(person));
        router.push('/(tabs)/(people)/person');
    }
}

function getStyles() {
    return StyleSheet.create({
        itemText: {flexGrow: 1, fontWeight: '500'},
    });
}