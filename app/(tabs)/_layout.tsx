import {Tabs} from 'expo-router';
import React from 'react';
import {Platform, StyleSheet} from 'react-native';

import {HapticPressable} from '@/components/ui/HapticPressable';
import TabBarBackground from '@/components/ui/TabBarBackground';
import {IconImage, IconImageName} from "@/components/ui/IconImage";
import {SafeAreaView} from "react-native-safe-area-context";
import {Styles} from "@/constants/Styles";
import {Colors} from "@/constants/Colors";

const tabScreens: { name: string, title: string, iconName: IconImageName }[] = [
    {
        name: '(people)',
        title: 'PEOPLE',
        iconName: 'people.fill',
    },
    {
        name: '(decision)',
        title: 'DECISION',
        iconName: 'decision.fill',
    },
    {
        name: '(restaurants)',
        title: 'RESTAURANTS',
        iconName: 'restaurants.fill',
    },
];

export default function TabLayout() {
    return <SafeAreaView style={Styles.hw100}>
        <Tabs
            initialRouteName="(decision)"
            screenOptions={{
                headerShown: false,
                tabBarHideOnKeyboard: true,
                tabBarButton: HapticPressable,
                tabBarBackground: TabBarBackground,
                tabBarActiveTintColor: Colors.tabIconTintColor,
                tabBarStyle: styles.tabBar,
                tabBarPosition: 'bottom',
            }}>
            {tabScreens.map(({name, title, iconName}) => (
                <Tabs.Screen
                    key={name}
                    name={name}
                    options={{
                        title,
                        tabBarIcon: getIconImg(iconName),
                    }}
                />
            ))}
        </Tabs>
    </SafeAreaView>;
}

function getIconImg(name: IconImageName) {
    const IconComponent = ({color}: { color: string }) => <IconImage size={22} name={name} color={color}/>;
    IconComponent.displayName = `Icon-${name}`;
    return IconComponent;
}

const styles = StyleSheet.create({
    tabBar: Platform.select({
        ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
        },
        default: {
            elevation: 0,
            height: 56,
        },
    })
});