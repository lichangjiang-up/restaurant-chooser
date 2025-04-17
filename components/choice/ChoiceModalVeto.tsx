import {useMemo} from "react";
import MyCheckbox from "@/components/ui/MyCheckbox";
import {Styles} from "@/constants/Styles";
import {FlatList, View, Text} from "react-native";
import MyBtn from "@/components/ui/MyBtn";
import {getPersonNameRelation, Person} from "@/store/state";
import {dialogStore, vetoedRecordStore} from "@/components/choice/choice_stores";
import {Colors} from "@/constants/Colors";

export type  ChoiceModalVetoProps = {
    goingPeople: Person[],
};

export default function ChoiceModalVeto({goingPeople}: ChoiceModalVetoProps) {
    const disabledBtn = !goingPeople?.length;
    const {modalShowOrHide, vetoShowHide, remainingRestaurant, setRemainingRestaurant} = dialogStore();
    const {clearRecord, record} = vetoedRecordStore();
    const vetoCount = useMemo(() => Object.keys(record).length, [record]);

    function vetoRenderItem({item}: { item: Person }) {
        return <MyCheckbox
            choice={item.key}
            store={vetoedRecordStore}
            label={getPersonNameRelation(item)}
            minHeight={46}/>;
    }

    return (<>
            <Text style={[Styles.title, {marginVertical: 10}]}>Who Veto?</Text>
            <FlatList
                data={goingPeople}
                renderItem={vetoRenderItem}
                keyExtractor={({key}) => `${key}-v`}
            />
            <View style={[Styles.rowBtw, Styles.mv20, Styles.gap20]}>
                <MyBtn
                    disabled={disabledBtn}
                    label='Cancel'
                    style={Styles.flex1}
                    isSmall={true}
                    backgroundColor={Colors.colorAAA}
                    onPress={() => {
                        clearRecord();
                        vetoShowHide();
                    }}
                />
                <MyBtn
                    disabled={vetoCount < 1 || disabledBtn}
                    label='Save'
                    isSmall={true}
                    style={Styles.flex1}
                    onPress={() => {
                        if (vetoCount < 1) {
                            return;
                        }
                        setRemainingRestaurant(remainingRestaurant - 1);
                        modalShowOrHide();
                    }}
                />
            </View>
        </>
    );
}
