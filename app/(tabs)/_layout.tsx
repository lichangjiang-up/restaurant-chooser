import {Tabs} from 'expo-router';
import React from 'react';
import {Platform, StyleSheet} from 'react-native';

import {HapticTab} from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import {IconImage, IconImageName} from "@/components/ui/IconImage";
import {Colors} from "react-native-ui-lib";


export default function TabLayout() {
    const styles = getStyles();
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors.$iconDanger,
                headerShown: false,
                tabBarButton: HapticTab,
                tabBarBackground: TabBarBackground,
                tabBarStyle: styles.tabBar,
            }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'People',
                    tabBarIcon: getIconImg('people.fill'),
                }}
            />
            <Tabs.Screen
                name="(decision)"
                options={{
                    title: 'Decision',
                    tabBarIcon: getIconImg('decision.fill'),
                }}
            />
            <Tabs.Screen
                name="(restaurants)"
                options={{
                    title: 'Restaurants',
                    tabBarIcon: getIconImg('restaurants.fill'),
                }}
            />
        </Tabs>
    );
}

function getIconImg(name: IconImageName) {
    return ({color}: { color: string }) => <IconImage size={22} name={name} color={color}/>
}

function getStyles() {
    return StyleSheet.create({
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
}

