import {Tabs} from 'expo-router';
import React from 'react';
import {Platform, StyleSheet} from 'react-native';

import {HapticTab} from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import {Colors} from '@/constants/Colors';
import {useColorScheme} from '@/hooks/useColorScheme';
import {IconImage} from "@/components/ui/IconImage";

const icon_size = 22

export default function TabLayout() {
    const colorScheme = useColorScheme();
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                headerShown: false,
                tabBarButton: HapticTab,
                tabBarBackground: TabBarBackground,
                tabBarStyle: styles.tabBar,
            }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'People',
                    tabBarIcon: ({color}) => <IconImage size={icon_size} name="people.fill" color={color}/>,
                }}
            />
            <Tabs.Screen
                name="(decision)"
                options={{
                    title: 'Decision',
                    tabBarIcon: ({color}) => <IconImage size={icon_size} name="decision.fill" color={color}/>,
                }}
            />
            <Tabs.Screen
                name="(restaurants)"
                options={{
                    title: 'Restaurants',
                    tabBarIcon: ({color}) => <IconImage size={icon_size} name="restaurants.fill" color={color}/>,
                }}
            />
        </Tabs>
    );
}


const styles = StyleSheet.create({
    tabBar: Platform.select({
        ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
        },
        default: {
            elevation: 0,
        },
    })
});
