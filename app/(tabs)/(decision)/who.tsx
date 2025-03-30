import {FlatList} from "react-native";
import {SafeThemedView} from "@/components/SafeThemedView";
import {Styles} from "@/constants/Styles";
import {Button, ButtonSize, Checkbox, Colors, Text, ToastPresets} from "react-native-ui-lib";
import {descSortStorage} from "@/store/storage";
import {router} from "expo-router";
import {useContext} from "react";
import {ToastContext} from "@/components/provider/ToastProvider";
import {Person, stateChoicesPeople, statePeople} from "@/store/store";


export default function TabWho() {
    const {showToast} = useContext(ToastContext);
    const people = statePeople(state => state.v);
    const choices = stateChoicesPeople(state => state.v);
    const state = stateChoicesPeople.getState();

    function renderItem({item}: { item: Person }) {
        return <Checkbox label={`${item.name}(${item.relation})`}
                         labelStyle={{lineHeight: 56, width: '100%'}}
                         value={choices.hasOwnProperty(item.key)}
                         onValueChange={(v) => {
                             if (!v) {
                                 state.delete(item.key);
                             } else {
                                 state.add(item.key, null);
                             }
                         }}></Checkbox>;
    }

    return (
        <SafeThemedView style={Styles.hw100}>
            <Text style={Styles.title}>Who's Going?</Text>
            <FlatList style={[Styles.flexG1, Styles.ph15]}
                      renderItem={renderItem}
                      data={descSortStorage(Object.values(people) as Person[])}
                      keyExtractor={({key}) => key}/>
            <Button
                label='Next'
                backgroundColor={Colors.$backgroundNeutralHeavy}
                borderRadius={14}
                size={ButtonSize.large}
                style={Styles.m15}
                labelStyle={Styles.lh30}
                onPress={() => {
                    const choiceKeys = Object.keys(choices)
                    const delKeys = choiceKeys.filter(key => !people.hasOwnProperty(key));
                    state.delete(...delKeys);
                    if (choiceKeys.length - delKeys.length < 1) {
                        showToast('Please select least a person', ToastPresets.FAILURE);
                        return;
                    }
                    router.push({
                        pathname: '/(tabs)/(decision)/choice',
                    });
                }}
                color={Colors.$white}
            />
        </SafeThemedView>
    )
}

