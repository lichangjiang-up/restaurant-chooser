import {Stack} from "expo-router";

export default function TabPeopleLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{headerShown: false, animation: 'fade'}}/>
            <Stack.Screen name="upsert" options={{
                title: 'Person',
                animation: 'fade',
            }}/>
        </Stack>
    )
}