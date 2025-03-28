import {Image, StyleSheet, Platform, View, Text} from 'react-native';

export default function PeopleScreen() {
    const styles = getStyles();
    return (
        <View style={styles.container}>
            <Text>People</Text>
        </View>
    );
}

function getStyles() {
    return StyleSheet.create({
        container: {justifyContent: 'center', alignItems: 'center', height: '100%'}
    });
}