import {useContext, useMemo} from "react";
import {ToastContext} from "@/components/provider/ToastProvider";
import MyCheckbox from "@/components/ui/MyCheckbox";
import {Styles} from "@/constants/Styles";
import {FlatList, View, Text, StyleSheet} from "react-native";
import LargeBtn from "@/components/ui/LargeBtn";
import {Person} from "@/store/state";
import {ToastPresets} from "react-native-ui-lib";
import {dialogStore, vetoedRecordStore} from "@/components/choice/choice_stores";

export type  ChoiceModalVetoProps = {
    goingPeople: Person[],
};

export default function ChoiceModalVeto({goingPeople}: ChoiceModalVetoProps) {
    const disabledBtn = !goingPeople?.length;
    const {showToast} = useContext(ToastContext);
    const {modalShowOrHide, vetoShowHide} = dialogStore();
    const {clearRecord, record} = vetoedRecordStore();
    const vetoCount = useMemo(() => Object.keys(record).length, [record]);
    const
        vetoRenderItem = ({item}: { item: Person }) => (<MyCheckbox
            choice={item.key}
            store={vetoedRecordStore}
            label={`${item.name}(${item.relation})`}
            lineHeight={46}
        />);

    return (<>
            <Text style={[Styles.title, {marginVertical: 10}]}>Who Veto?</Text>
            <FlatList
                data={goingPeople}
                renderItem={vetoRenderItem}
                keyExtractor={({key}) => `${key}-v`}
            />
            <View style={[Styles.rowBtw, Styles.mv20]}>
                <LargeBtn
                    disabled={disabledBtn}
                    label='Cancel'
                    style={styles.vetoBtn}
                    backgroundColor={'#AAA'}
                    onPress={() => {
                        clearRecord();
                        vetoShowHide();
                    }}
                />
                <LargeBtn
                    disabled={vetoCount < 1 || disabledBtn}
                    label='Save'
                    style={styles.vetoBtn}
                    onPress={() => {
                        if (vetoCount < 1) {
                            showToast('Least one have vetoed!', ToastPresets.FAILURE);
                            return;
                        }
                        modalShowOrHide();
                    }}
                />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    vetoBtn: {marginLeft: 10, flex: 1},
});