import {FlatList} from "react-native";
import {VFull} from "@/components/VFull";
import {Styles} from "@/constants/Styles";
import {Button, ButtonSize, Checkbox, Colors, Text, ToastPresets} from "react-native-ui-lib";
import {descSortStorage} from "@/store/storage";
import {router} from "expo-router";
import {useContext} from "react";
import {ToastContext} from "@/components/provider/ToastProvider";
import {Person, stateChoicesPeople, statePeople} from "@/store/state";
import LargeBtn from "@/components/ui/LargeBtn";


export default function TabWho() {
    const people = statePeople(state => state.v);
    const choices = stateChoicesPeople(state => state.v);
    const state = stateChoicesPeople.getState();

    function renderItem({item}: { item: Person }) {
        return <Checkbox
            key={item.key}
            label={`${item.name}(${item.relation})`}
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

    const {showToast} = useContext(ToastContext);

    return (
        <VFull>
            <Text style={Styles.title}>Who's Going?</Text>
            <FlatList style={[Styles.flexG1, Styles.ph15]}
                      renderItem={renderItem}
                      data={descSortStorage(Object.values(people) as Person[])}
                      keyExtractor={({key}) => key}/>
            <LargeBtn
                label='Next'
                onPress={() => {
                    const choiceKeys = Object.keys(choices)
                    const delKeys = choiceKeys.filter(key => !people.hasOwnProperty(key));
                    state.delete(...delKeys);
                    if (choiceKeys.length - delKeys.length < 1) {
                        showToast('Please select least a person', ToastPresets.FAILURE);
                        return;
                    }
                    router.push('/(tabs)/(decision)/choice');
                }}
                color={Colors.$white}
            />
        </VFull>
    )
}

