import {Link, Stack} from 'expo-router';

import {SafeThemedView} from '@/components/SafeThemedView';
import {Text} from "react-native-ui-lib";
import {Styles} from "@/constants/Styles";

export default function NotFoundScreen() {
    return (
        <>
            <Stack.Screen options={{title: 'Oops!'}}/>
            <SafeThemedView style={Styles.cContainer}>
                <Text>This screen doesn't exist.</Text>
                <Link href="/(tabs)/(people)" style={Styles.link}>
                    <Text>Go to home screen!</Text>
                </Link>
            </SafeThemedView>
        </>
    );
}
