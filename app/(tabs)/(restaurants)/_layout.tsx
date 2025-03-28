import {Stack} from "expo-router";

export default function RestaurantsLayout() {
    return (
        <Stack>
            <Stack.Screen name="list" options={{headerShown: false, animation: 'fade'}}/>
            <Stack.Screen name="upsert" options={{
                title: 'Add Restaurant',
                animation: 'fade',
            }}/>
        </Stack>
    )
}