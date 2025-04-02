import {Stack} from "expo-router";

export default function TabRestaurantsLayout() {
    return (
        <Stack>
            <Stack.Screen name="restaurants" options={{headerShown: false, animation: 'fade'}}/>
            <Stack.Screen name="restaurant" options={{
                title: 'Add Restaurant',
                animation: 'fade',
            }}/>
        </Stack>
    )
}