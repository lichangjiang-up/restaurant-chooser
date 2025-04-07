import {Stack} from "expo-router";

export default function DecisionLayout() {
    return (
        <Stack initialRouteName="index">
            <Stack.Screen name="index" options={{headerShown: false, animation: 'fade'}}/>
            <Stack.Screen name="who" options={{headerShown: false, animation: 'fade'}}/>
            <Stack.Screen name="choice" options={{headerShown: false, animation: 'fade'}}/>
            <Stack.Screen name="enjoy" options={{headerShown: false, animation: 'fade'}}/>
            <Stack.Screen name="pre_filters" options={{headerShown: false, animation: 'fade'}}/>
        </Stack>
    )
}