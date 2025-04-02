import {Link, Stack} from 'expo-router';

import {SafeContainer} from '@/components/SafeContainer';
import {Text} from "react-native-ui-lib";
import {Styles} from "@/constants/Styles";

export default function NotFoundScreen() {
    return (
        <>
            <Stack.Screen options={{title: 'Oops!'}}/>
            <SafeContainer style={Styles.cContainer}>
                <Text>This screen doesn't exist.</Text>
                <Link href="/(tabs)/(people)" style={Styles.link}>
                    <Text>Go to home screen!</Text>
                </Link>
            </SafeContainer>
        </>
    );
}
