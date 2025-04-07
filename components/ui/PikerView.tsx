// import {FlatList, Pressable, StyleSheet, Text, View} from "react-native";
// import {VSP} from "@/constants/Styles";
// import {useState} from "react";
// import MyModal from "@/components/ui/MyModal";


// TODO
// export default function PikerView<K extends string>({label, placeHolder, style, initValue, valueLabels, onChange}: {
//     initValue: K | K[],
//     valueLabels: ValueLabel[],
//     onChange: (text: string) => void,
//     label: string,
//     placeHolder: string,
//     style?: VSP,
// }) {
//     const [show, setShow] = useState(false);
//
//     function renderItem({item}: { item: ValueLabel }) {
//         return <View key={item.label}/>;
//     }
//
//     return <Pressable style={[styles.container, style]} onPress={() => setShow(true)}>
//         <MyModal visible={show}>
//             <Text style={styles.text}>Save</Text>
//             <FlatList data={valueLabels} keyExtractor={({value}) => value}
//                       renderItem={renderItem}/>
//         </MyModal>
//         <Text style={styles.text}>{initValue}</Text>
//     </Pressable>;
// }
//
// const styles = StyleSheet.create({
//     container: {
//         display: 'flex',
//         justifyContent: 'flex-start',
//         alignItems: 'center',
//         width: '100%',
//         height: 48,
//         borderBottomWidth: 1,
//         borderRadius: 8,
//         padding: 12,
//     },
//     text: {
//         fontSize: 18,
//     }
// });