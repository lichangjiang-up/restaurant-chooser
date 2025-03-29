import {FlatList, StyleSheet} from 'react-native';

import {SafeThemedView} from "@/components/SafeThemedView";
import {router} from "expo-router";
import {Styles} from "@/constants/Styles";
import {Button, ButtonSize, Colors, Text, View} from "react-native-ui-lib";
import {
    descSortStorage,
    getListByTyp,
    PEOPLE_STORAGE,
    Person,
} from "@/constants/Storage";
import {useContext, useEffect, useState} from "react";
import {ToastContext} from "@/components/provider/ToastProvider";
import {USW} from "@/constants/UseStateWrapper";
import {HapticPressable} from "@/components/ui/HapticPressable";

export default function TabPeopleScreen() {
    const [mp, setMp] = useState(new USW(new Map<string, Person>()));

    useEffect(() => {
        const nMp = new USW(getListByTyp<Person>(PEOPLE_STORAGE));
        setMp(nMp);
        const listener = PEOPLE_STORAGE.addOnValueChangedListener((changedKey) => {
            const newValue = PEOPLE_STORAGE.getString(changedKey)
            if (!newValue) {
                nMp.v.delete(changedKey);
            } else {
                nMp.v.set(changedKey, JSON.parse(newValue));
            }
            setMp(nMp.renew());
        });
        return () => {
            listener.remove();
        };
    }, []);


    const {showToast} = useContext(ToastContext);

    const styles = getStyles();

    function renderItem({item}: { item: Person }) {
        return <HapticPressable
            onPress={upsertPerson('Edit', item.key)}
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
                            PEOPLE_STORAGE.delete(item.key);
                            showToast('Person deleted');
                        }}/>
            </View>
        </HapticPressable>;
    }

    return (
        <SafeThemedView style={Styles.hw100}>
            <FlatList data={descSortStorage(mp.v.values())}
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
                onPress={upsertPerson('Add')}
                color={Colors.$white}
            />
        </SafeThemedView>
    );
}

function upsertPerson(typ: string, key?: string) {
    return () => {
        router.push({
            pathname: '/(tabs)/(people)/upsert',
            params: {
                title: `${typ} Person`,
                mode: typ.toLocaleLowerCase(),
                key,
            }
        });
    }
}

function getStyles() {
    return StyleSheet.create({
        itemText: {flexGrow: 1, fontWeight: '500'},
    });
}