import {ScrollView, StyleSheet} from "react-native";
import {SafeThemedView} from "@/components/SafeThemedView";
import {Styles, VST} from "@/constants/Styles";
import {Text} from "react-native-ui-lib";

export default function TabGoing() {
    const styles = getStyles();
    return (
        <SafeThemedView style={Styles.container}>
            <Text style={styles.whoText}>Who's Going?</Text>
            <ScrollView>

            </ScrollView>
        </SafeThemedView>
    )
}


function getStyles() {
    return StyleSheet.create({
        whoText: {
            fontWeight: 'bold',
            textAlign: 'center',
            fontSize: 28,
            lineHeight: 80,
        }
    })
}