import {FlatList, StyleSheet} from 'react-native';

import {SafeThemedView} from "@/components/SafeThemedView";
import {router} from "expo-router";
import {Styles} from "@/constants/Styles";
import {Button, ButtonSize, Colors, Text, View} from "react-native-ui-lib";
import {descSortStorage, getListByTyp, Restaurant, RESTAURANT_STORAGE} from "@/constants/Storage";
import {useContext, useEffect, useState} from "react";
import {ToastContext} from "@/components/provider/ToastProvider";
import {HapticPressable} from "@/components/ui/HapticPressable";
import {USW} from "@/constants/UseStateWrapper";

export default function TabRestaurantsScreen() {
    const [usw, setUsw] = useState(new USW(new Map<string, Restaurant>()));

    useEffect(() => {
        const nUsw = new USW(getListByTyp<Restaurant>(RESTAURANT_STORAGE));
        setUsw(nUsw);
        const listener = RESTAURANT_STORAGE.addOnValueChangedListener((changedKey) => {
            const newValue = RESTAURANT_STORAGE.getString(changedKey)
            if (!newValue) {
                nUsw.v.delete(changedKey);
            } else {
                nUsw.v.set(changedKey, JSON.parse(newValue));
            }
            setUsw(nUsw.renew());
        });
        return () => {
            listener.remove();
        };
    }, []);


    const {showToast} = useContext(ToastContext);

    const styles = getStyles();

    function renderItem({item}: { item: Restaurant }) {
        return <HapticPressable
            onPress={upsertRestaurant('Edit', item.key)}
            key={item.key}>
            <View style={[Styles.borderBottom, Styles.rowBtw, Styles.p10_8]}>
                <Text style={styles.itemText} $textDefault>{item.name || item.key}</Text>
                <Button backgroundColor={Colors.$backgroundNeutralHeavy}
                        color={Colors.$white}
                        label='Delete'
                        labelStyle={Styles.lh30}
                        size={ButtonSize.large}
                        borderRadius={14}
                        onPress={() => {
                            RESTAURANT_STORAGE.delete(item.key);
                            showToast('Restaurant deleted');
                        }}/>
            </View>
        </HapticPressable>;
    }

    return (
        <SafeThemedView style={Styles.hw100}>
            <FlatList data={descSortStorage(usw.v.values())}
                      style={[Styles.flexG1, Styles.ph5]}
                      keyExtractor={({key}) => key}
                      renderItem={renderItem}>
            </FlatList>
            <Button
                label='Add Restaurant'
                backgroundColor={Colors.$backgroundNeutralHeavy}
                borderRadius={14}
                size={ButtonSize.large}
                style={Styles.m15}
                labelStyle={Styles.lh30}
                onPress={upsertRestaurant('Add')}
                color={Colors.$white}
            />
        </SafeThemedView>
    );
}

function upsertRestaurant(typ: string, key?: string) {
    return () => {
        router.push({
            pathname: '/(tabs)/(restaurants)/upsert',
            params: {
                title: `${typ} Restaurant`,
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