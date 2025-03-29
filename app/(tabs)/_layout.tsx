import {Tabs} from 'expo-router';
import React from 'react';
import {KeyboardAvoidingView, Platform, StyleSheet} from 'react-native';

import {HapticPressable} from '@/components/ui/HapticPressable';
import TabBarBackground from '@/components/ui/TabBarBackground';
import {IconImage, IconImageName} from "@/components/ui/IconImage";
import {Colors} from "react-native-ui-lib";

const tabHeight = 56;

export default function TabLayout() {
    const styles = getStyles();
    return (
        <KeyboardAvoidingView style={{flex: 1}}
                              behavior={Platform.select({default: 'height', ios: 'padding'})}
                              keyboardVerticalOffset={-tabHeight}>
            <Tabs
                screenOptions={{
                    tabBarPosition: 'bottom',
                    tabBarActiveTintColor: Colors.$iconDanger,
                    headerShown: false,
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
        </KeyboardAvoidingView>
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
                height: tabHeight,
            },
        })
    });
}

