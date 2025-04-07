import {Stack} from "expo-router";

export default function TabPeopleLayout() {
    return (
        <Stack initialRouteName="index">
            <Stack.Screen name="index" options={{headerShown: false, animation: 'fade'}}/>
            <Stack.Screen name="person" options={{
                headerShown: false,
                animation: 'fade',
            }}/>
        </Stack>
    )
}