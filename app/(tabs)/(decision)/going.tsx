import {ScrollView, StyleSheet} from "react-native";
import {SafeThemedView} from "@/components/SafeThemedView";
import {ThemedText} from "@/components/ThemedText";

export default function TabGoing() {
    return (
        <SafeThemedView style={styles.container}>
            <ThemedText style={styles.whoGoText}>Who's Going?</ThemedText>
            <ScrollView>

            </ScrollView>
        </SafeThemedView>
    )
}


const styles = StyleSheet.create({
    container: {height: '100%'},
    whoGoText: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 28,
        lineHeight: 80,
    }
});
