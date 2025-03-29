import {Stack} from "expo-router";

export default function DecisionLayout() {
    return (
        <Stack>
            <Stack.Screen name="decision" options={{headerShown: false, animation: 'fade'}}/>
            <Stack.Screen name="who" options={{headerShown: false, animation: 'fade'}}/>
            <Stack.Screen name="choice" options={{headerShown: false, animation: 'fade'}}/>
        </Stack>
    )
}