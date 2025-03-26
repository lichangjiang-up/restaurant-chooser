import {ScrollView, StyleSheet} from "react-native";
import {SafeThemedView} from "@/components/SafeThemedView";
import {Styles} from "@/constants/Styles";
import {Text} from "react-native-ui-lib";

export default function TabGoing() {
    return (
        <SafeThemedView style={Styles.container}>
            <Text style={styles.whoGoText}>Who's Going?</Text>
            <ScrollView>

            </ScrollView>
        </SafeThemedView>
    )
}

const styles = StyleSheet.create({
    whoGoText: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 28,
        lineHeight: 80,
    }
});
