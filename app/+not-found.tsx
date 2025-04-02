import {Link, Stack} from 'expo-router';

import {VFull} from '@/components/VFull';
import {Text} from "react-native-ui-lib";
import {Styles} from "@/constants/Styles";
import {SafeAreaView} from "react-native-safe-area-context";

export default function NotFoundScreen() {
    return (
        <>
            <Stack.Screen options={{title: 'Oops!'}}/>
            <SafeAreaView style={[Styles.hw100, Styles.cContainer]}>
                <Text>This screen doesn't exist.</Text>
                <Link href="/(tabs)/(people)" style={Styles.link}>
                    <Text>Go to home screen!</Text>
                </Link>
            </SafeAreaView>
        </>
    );
}
