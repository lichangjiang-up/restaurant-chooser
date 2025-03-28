import {FlatList, StyleSheet} from 'react-native';

import {SafeThemedView} from "@/components/SafeThemedView";
import {router} from "expo-router";
import {Styles} from "@/constants/Styles";
import {Button, ButtonSize, Colors, ListItem, Text, View} from "react-native-ui-lib";
import {deleteItem, getListByTyp, Restaurant, StorageTyp} from "@/constants/Storage";
import {useContext, useEffect, useState} from "react";
import {ToastContext} from "@/components/ui/ToastProvider";
import {useAsyncStorage} from "@react-native-async-storage/async-storage";

export default function TabRestaurantsScreen() {
    const [lst, setLst] = useState(new Array<Restaurant>());

    const hook = useAsyncStorage(StorageTyp.RESTAURANT)
    useEffect(() => {
        getListByTyp<Restaurant>(hook).then(lst => setLst(lst.sort((r1, r2) => Number(r2.key) - Number(r1.key))));
    }, []);

    console.log('-->', lst);

    const {showToast} = useContext(ToastContext);

    const styles = getStyles();

    function renderItem({item, index}: { item: any, index: number }) {
        return <ListItem
            onPress={upsertRestaurant('Edit', item.key)}
            key={index}>
            <View
                style={styles.itemCon}>
                <Text style={styles.itemText} $textDefault>{item.name}</Text>
                <Button backgroundColor={Colors.$backgroundNeutralHeavy}
                        color={Colors.$white}
                        label='Delete'
                        labelStyle={Styles.lh30}
                        size={ButtonSize.large}
                        borderRadius={6}
                        onPress={() => {
                            deleteItem(hook, item.key).then(() => {
                                showToast('Restaurant deleted');
                            });
                        }}/>
            </View>
        </ListItem>;
    }

    return (
        <SafeThemedView style={Styles.container}>
            <FlatList data={lst}
                      style={Styles.flexG1}
                      keyExtractor={({key}) => key.toString()}
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