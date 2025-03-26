import {StyleSheet} from 'react-native';

import {ThemedText} from '@/components/ThemedText';
import {SafeThemedView} from '@/components/SafeThemedView';
import {Styles} from "@/constants/Styles";

export default function TabRestaurantsScreen() {
    return (
        <SafeThemedView style={Styles.cContainer}>
            <ThemedText>RR</ThemedText>
        </SafeThemedView>
    );
}

const styles = StyleSheet.create({
    headerImage: {
        color: '#808080',
        bottom: -90,
        left: -35,
        position: 'absolute',
    },
    titleContainer: {
        flexDirection: 'row',
        gap: 8,
    },
});
