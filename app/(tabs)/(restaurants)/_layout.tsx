import {Stack} from "expo-router";

export default function TabRestaurantsLayout() {
    return (
        <Stack initialRouteName="index">
            <Stack.Screen name="index" options={{headerShown: false, animation: 'fade'}}/>
            <Stack.Screen name="restaurant" options={{
                headerShown: false,
                title: 'Add Restaurant',
                animation: 'fade',
            }}/>
        </Stack>
    )
}