import {Tabs} from 'expo-router';
import React from 'react';
import {Platform, StyleSheet} from 'react-native';

import {HapticPressable} from '@/components/ui/HapticPressable';
import TabBarBackground from '@/components/ui/TabBarBackground';
import {IconImage, IconImageName} from "@/components/ui/IconImage";
import {Colors} from "react-native-ui-lib";
import {SafeAreaView} from "react-native-safe-area-context";
import {Styles} from "@/constants/Styles";

const tabHeight = 56;

export default function TabLayout() {
    return (
        <SafeAreaView style={Styles.hw100}>
            <Tabs
                screenOptions={{
                    tabBarPosition: 'bottom',
                    tabBarActiveTintColor: Colors.$iconDanger,
                    headerShown: false,
                    tabBarHideOnKeyboard: true,
                    tabBarButton: HapticPressable,
                    tabBarBackground: TabBarBackground,
                    tabBarStyle: styles.tabBar,
                }}>
                <Tabs.Screen
                    name="(people)"
                    options={{
                        title: 'PEOPLE',
                        tabBarIcon: getIconImg('people.fill'),
                    }}
                />
                <Tabs.Screen
                    name="(decision)"
                    options={{
                        title: 'DECISION',
                        tabBarIcon: getIconImg('decision.fill'),
                    }}
                />
                <Tabs.Screen
                    name="(restaurants)"
                    options={{
                        title: 'RESTAURANTS',
                        tabBarIcon: getIconImg('restaurants.fill'),
                    }}
                />
            </Tabs>
        </SafeAreaView>
    );
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
            height: tabHeight,
        },
    })
});
