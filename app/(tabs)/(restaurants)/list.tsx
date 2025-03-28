import {FlatList, StyleSheet} from 'react-native';

import {SafeThemedView} from "@/components/SafeThemedView";
import {router} from "expo-router";
import {Styles} from "@/constants/Styles";
import {Button, ButtonSize, Colors, ListItem, Text, View} from "react-native-ui-lib";
import {getListByTyp, Restaurant, RESTAURANT_STORAGE} from "@/constants/Storage";
import {useContext, useEffect, useState} from "react";
import {ToastContext} from "@/components/provider/ToastProvider";
import {Listener} from 'react-native-mmkv/lib/typescript/src/Types';

let listener: Listener;

export default function TabRestaurantsScreen() {
    const [mp, setMp] = useState(new Map<string, Restaurant>());

    useEffect(() => {
        const nMp = getListByTyp<Restaurant>(RESTAURANT_STORAGE);
        setMp(nMp);
        if (listener) {
            listener.remove();
        }
        listener = RESTAURANT_STORAGE.addOnValueChangedListener((changedKey) => {
            const newValue = RESTAURANT_STORAGE.getString(changedKey)
            if (!newValue) {
                nMp.delete(changedKey);
            } else {
                nMp.set(changedKey, JSON.parse(newValue));
            }
            setMp(nMp);
        });
    }, []);


    const {showToast} = useContext(ToastContext);

    const styles = getStyles();

    function renderItem({item, index}: { item: any, index: number }) {
        return <ListItem
            onPress={upsertRestaurant('Edit', item.key)}
            key={index}>
            <View
                style={styles.itemCon}>
                <Text style={styles.itemText} $textDefault>{item.name || item.key}</Text>
                <Button backgroundColor={Colors.$backgroundNeutralHeavy}
                        color={Colors.$white}
                        label='Delete'
                        labelStyle={Styles.lh30}
                        size={ButtonSize.large}
                        borderRadius={6}
                        onPress={() => {
                            RESTAURANT_STORAGE.delete(item.key);
                            showToast('Restaurant deleted');
                        }}/>
            </View>
        </ListItem>;
    }

    return (
        <SafeThemedView style={Styles.container}>
            <FlatList data={Array.from(mp.values()).sort((a, b) => Number(b.key) - Number(a.key))}
                      style={Styles.flexG1}
                      keyExtractor={({key}) => key}
                      renderItem={renderItem}>
            </FlatList>
            <Button
                label='Add Restaurant'
                backgroundColor={Colors.$backgroundNeutralHeavy}
                borderRadius={6}
                size={ButtonSize.large}
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
        itemCon: {
            paddingVertical: 6,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexGrow: 1,
            borderColor: Colors.$backgroundNeutral,
            borderBottomWidth: 1,
            borderStyle: 'solid',
        },
        itemText: {flexGrow: 1, fontWeight: '500'},
    });
}