import {SafeAreaView} from "react-native-safe-area-context";
import {Styles} from "@/constants/Styles";
import {FlatList} from "react-native";
import {Button, Text, ButtonSize, Colors} from "react-native-ui-lib";
import {Person} from "@/constants/Storage";
import {HapticPressable} from "@/components/ui/HapticPressable";

class VetPerson extends Person {
    vetoed: boolean = false;
}

export default function TabChoiceScreen() {

    function renderItem({item}: { item: VetPerson }) {
        return <HapticPressable
            onPress={() => {
            }}
            style={[Styles.borderBottom, Styles.rowBtw]}
            key={item.key}>
            <Text style={[Styles.lh30]} $textDefault>{`${item.name}(${item.relation})`}</Text>
            <Text style={[Styles.lh30]} $textDefault>{`Vetoed: ${item.vetoed ? 'yes' : 'no'}`}</Text>
        </HapticPressable>;
    }

    return (
        <SafeAreaView style={Styles.hw100}>
            <Text style={Styles.title}>Choice Screen</Text>
            <FlatList style={[Styles.flexG1, Styles.ph15]} renderItem={renderItem} data={[]}
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
        </SafeAreaView>);
}