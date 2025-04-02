import {FlatList, StyleSheet} from 'react-native';

import {SafeContainer} from "@/components/SafeContainer";
import {router} from "expo-router";
import {Styles} from "@/constants/Styles";
import {Button, ButtonSize, Colors, Text, View} from "react-native-ui-lib";
import {descSortStorage} from "@/store/storage";
import {useContext} from "react";
import {ToastContext} from "@/components/provider/ToastProvider";
import {HapticPressable} from "@/components/ui/HapticPressable";
import {newPerson, Person, statePeople, statePerson} from "@/store/store";
import {PlatformPressable} from "@react-navigation/elements";

export default function TabPeopleScreen() {
    const people = Object.values(statePeople(state => state.v)) as Person[];
    const {showToast} = useContext(ToastContext);

    const styles = getStyles();

    function renderItem({item}: { item: Person }) {
        return <PlatformPressable
            onPress={upsertPerson(item)}
            key={item.key}
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
        </PlatformPressable>;
    }

    return (
        <SafeContainer style={Styles.hw100}>
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
        </SafeContainer>
    );
}

function upsertPerson(person?: Person) {
    return () => {
        statePerson.getState().reset(person ? {...person} : newPerson());
        router.push('/(tabs)/(people)/person');
    }
}

function getStyles() {
    return StyleSheet.create({
        itemText: {flexGrow: 1, fontWeight: '500'},
    });
}