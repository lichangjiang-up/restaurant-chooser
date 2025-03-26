import {Stack} from "expo-router";

export default function DecisionLayout() {
    return (
        <Stack>
            <Stack.Screen name="decision" options={{headerShown: false, animation: 'fade'}}/>
            <Stack.Screen name="going" options={{headerShown: false, animation: 'fade'}}/>
        </Stack>
    )
}