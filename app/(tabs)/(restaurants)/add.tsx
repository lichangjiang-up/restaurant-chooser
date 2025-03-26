import {StyleSheet} from 'react-native';

import {ThemedText} from '@/components/ThemedText';
import {SafeThemedView} from '@/components/SafeThemedView';
import {Styles} from "@/constants/Styles";

export default function TabAddScreen() {
    return (
        <SafeThemedView style={Styles.cContainer}>
            <ThemedText>ASS</ThemedText>
        </SafeThemedView>
    );
}
