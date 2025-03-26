import {Stack} from "expo-router";

export default function RestaurantsLayout() {
    return (
        <Stack>
            <Stack.Screen name="restaurants" options={{headerShown: false, animation: 'fade'}}/>
            <Stack.Screen name="add" options={{headerShown: false, animation: 'fade'}}/>
        </Stack>
    )
}