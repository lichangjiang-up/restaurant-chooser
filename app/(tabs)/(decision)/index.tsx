import {StyleSheet, Image, Platform, Text, View} from 'react-native';
import {Link} from 'expo-router';
import {Styles} from '@/constants/Styles';
import {VFull} from "@/components/VFull";
import {Colors} from "react-native-ui-lib";

const img_url = Platform.select({
    ios: require('@/assets/images/img/its-decision-time.ios.png'),
    default: require('@/assets/images/img/its-decision-time.android.png'),
});

export default function TabDecisionScreen() {
    const styles = getStyles()
    return (
        <VFull style={Styles.cContainer}>
            <Link href='/(tabs)/(decision)/who' style={Styles.w100}>
                <View style={[Styles.w100, Styles.center]}>
                    <Image
                        resizeMode='contain'
                        source={img_url}
                        style={styles.foodImage}/>
                    <Text style={styles.hintText}>(click the food to get going)</Text>
                </View>
            </Link>
        </VFull>
    );
}

function getStyles() {
    return StyleSheet.create({
        foodImage: {
            objectFit: 'contain',
            width: '80%',
            height: 200,
        },
        hintText: {
            marginTop: 20,
            fontWeight: 'bold',
            textAlign: 'center',
            color: Colors.$textDefault
        },
    });
}
