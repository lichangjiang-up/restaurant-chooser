import {DarkTheme, DefaultTheme, ThemeProvider} from '@react-navigation/native';
import {useFonts} from 'expo-font';
import {Stack} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import {StatusBar} from 'expo-status-bar';
import {useEffect} from 'react';
import 'react-native-reanimated';

import {useColorScheme} from '@/hooks/useColorScheme';
import {SafeAreaProvider} from "react-native-safe-area-context";
import {Colors} from "react-native-ui-lib";
import {ToastProvider} from "@/components/ui/ToastProvider";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const colorScheme = useColorScheme();
    Colors.setScheme(colorScheme === 'dark' ? 'dark' : 'light');
    const [loaded] = useFonts({
        SpaceMono: require('@/assets/fonts/SpaceMono-Regular.ttf'),
    });

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }
    return (
        <SafeAreaProvider>
            <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
                <ToastProvider>
                    <Stack>
                        <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
                        <Stack.Screen name="+not-found"/>
                    </Stack>
                    <StatusBar style="auto"/>
                </ToastProvider>
            </ThemeProvider>
        </SafeAreaProvider>
    );
}
