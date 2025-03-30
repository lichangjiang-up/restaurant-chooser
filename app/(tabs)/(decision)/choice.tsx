import {Styles, VST} from "@/constants/Styles";
import {FlatList} from "react-native";
import {Button, Text, ButtonSize, Colors} from "react-native-ui-lib";
import {descSortStorage} from "@/store/storage";
import {HapticPressable} from "@/components/ui/HapticPressable";
import {Marker, Person, stateChoicesPeople, statePeople} from "@/store/store";
import {SafeThemedView} from "@/components/SafeThemedView";

export default function TabChoiceScreen() {
    const choices = stateChoicesPeople(state => state.v);
    const people = Object.values(statePeople(state => state.v)) as Person[];

    const itemTextStyle: VST = {fontWeight: 400, fontSize: 18, lineHeight: 50};

    function renderItem({item}: { item: Person & Marker }) {
        return <HapticPressable
            onPress={() => {
            }}
            style={[Styles.borderBottom, Styles.rowBtw]}
            key={item.key}>
            <Text style={itemTextStyle} $textDefault>{`${item.name}(${item.relation})`}</Text>
            <Text style={itemTextStyle} $textDefault>{`Vetoed: ${item.marker ? 'yes' : 'no'}`}</Text>
        </HapticPressable>;
    }

    return (
        <SafeThemedView style={Styles.hw100}>
            <Text style={Styles.title}>Choice Screen</Text>
            <FlatList style={[Styles.flexG1, Styles.ph15]} renderItem={renderItem}
                      data={descSortStorage(people.filter(p => choices.hasOwnProperty(p.key))) as (Person & Marker)[]}
                      keyExtractor={({key}) => key}/>
            <Button
                label='Rondomly Choice'
                backgroundColor={Colors.$backgroundNeutralHeavy}
                borderRadius={14}
                size={ButtonSize.large}
                style={Styles.m15}
                onPress={() => {

                }}
                color={Colors.$white}
            />
        </SafeThemedView>);
}