import {Image, StyleSheet, Platform, View, Text} from 'react-native';

export default function HomeScreen() {
  return (

      <View style={styles.container}>
          <Text>People</Text>
      </View>
  );
}

const styles = StyleSheet.create({
    container: {justifyContent: 'center', alignItems: 'center', height: '100%'}
});
