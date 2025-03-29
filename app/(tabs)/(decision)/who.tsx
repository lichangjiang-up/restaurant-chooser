import {FlatList} from "react-native";
import {SafeThemedView} from "@/components/SafeThemedView";
import {Styles} from "@/constants/Styles";
import {Button, ButtonSize, Checkbox, Colors, Text} from "react-native-ui-lib";
import {useEffect, useState} from "react";
import {descSortStorage, getListByTyp, PEOPLE_STORAGE, Person} from "@/constants/Storage";
import {router} from "expo-router";
import {USW} from "@/constants/UseStateWrapper";

class PersonCheck extends Person {
    checked: boolean = false;
}

export default function TabWho() {
    const [usw, setUsw] = useState(new USW(new Map<string, PersonCheck>()));
    useEffect(() => {
        const nUsw = new USW(getListByTyp<PersonCheck>(PEOPLE_STORAGE));
        setUsw(nUsw);
        const listener = PEOPLE_STORAGE.addOnValueChangedListener(function (changedKey) {
            const newValue = PEOPLE_STORAGE.getString(changedKey)
            if (!newValue) {
                nUsw.v.delete(changedKey);
            } else {
                nUsw.v.set(changedKey, Object.assign(JSON.parse(newValue), {checked: !!nUsw.v.get(changedKey)?.checked}));
            }
            setUsw(nUsw.renew());
        });
        return () => {
            listener.remove();
        };
    }, []);

    function renderItem({item}: { item: PersonCheck, index: number }) {
        return <Checkbox label={`${item.name}(${item.relation})`}
                         labelStyle={{lineHeight: 56, width: '100%'}}
                         value={!!item.checked}
                         key={item.key}
                         onValueChange={(v) => {
                             item.checked = v;
                             setUsw(usw.renew());
                         }}></Checkbox>;
    }

    return (
        <SafeThemedView style={Styles.hw100}>
            <Text style={Styles.title}>Who's Going?</Text>
            <FlatList style={[Styles.flexG1, Styles.ph15]}
                      renderItem={renderItem}
                      data={descSortStorage(usw.v.values())}
                      keyExtractor={({key}) => key}/>
            <Button
                label='Next'
                backgroundColor={Colors.$backgroundNeutralHeavy}
                borderRadius={14}
                size={ButtonSize.large}
                style={Styles.m15}
                labelStyle={Styles.lh30}
                onPress={() => {
                    router.push({
                        pathname: '/(tabs)/(decision)/choice',
                    });
                }}
                color={Colors.$white}
            />
        </SafeThemedView>
    )
}

