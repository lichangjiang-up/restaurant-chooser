import {FlatList} from 'react-native';

import {SafeThemedView} from '@/components/SafeThemedView';
import {router} from "expo-router";
import {Styles} from "@/constants/Styles";
import {Button, ButtonSize, Colors, ListItem, Text, View} from "react-native-ui-lib";


const lst = [
    {
        name: "Home Lucky",
        id: new Date().getTime(),
    },
    {
        name: "China KFC",
        id: new Date().getTime(),
    },
    {
        name: "China KFC",
        id: new Date().getTime(),
    },
    {
        name: "China KFC",
        id: new Date().getTime(),
    },
    {
        name: "China KFC",
        id: new Date().getTime(),
    },
    {
        name: "USE KFC",
        id: new Date().getTime(),
    },
    {
        name: "USC KFC",
        id: new Date().getTime(),
    },
    {
        name: "USA KFC",
        id: new Date().getTime(),
    },
    {
        name: "USB KFC",
        id: new Date().getTime(),
    },
]

export default function TabRestaurantsScreen() {
    function itemPress(item: any) {
        console.log(item);
    }

    return (
        <SafeThemedView style={Styles.container}>
            <FlatList data={lst}
                      keyExtractor={(item, index) => (index + item.id).toString()}
                      renderItem={({item, index}) => <ListItem
                          key={index}
                          containerStyle={{
                              display: 'flex',
                              padding: 5,
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              borderStyle: 'solid',
                              borderBottomWidth: 1
                          }}
                          containerElement={View}
                          onPress={() => itemPress(item)}>
                          <Text style={{flexGrow: 1, fontWeight: '500'}} color={Colors.$textDefault}>{item.name}</Text>
                          <Button backgroundColor={Colors.$backgroundNeutralHeavy}
                                  color={Colors.$white}
                                  label='delete'
                                  size={ButtonSize.medium}
                                  borderRadius={6}
                                  onPress={() => {
                                      console.log(item.name)
                                  }}/>
                      </ListItem>}>
            </FlatList>
            <Button
                label='Add Restaurant'
                backgroundColor={Colors.$backgroundNeutralHeavy}
                borderRadius={6}
                size={ButtonSize.large}
                onPress={() => router.push('/(tabs)/(restaurants)/add')}
                color={Colors.$white}
            />
        </SafeThemedView>
    );
}