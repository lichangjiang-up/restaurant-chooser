import {StyleSheet, Image, Platform} from 'react-native';
import {Link} from 'expo-router';
import {Styles} from '@/constants/Styles';
import {VFull} from "@/components/VFull";
import {Colors, Text} from "react-native-ui-lib";

const img_url = Platform.select({
    ios: require('@/assets/images/img/its-decision-time.ios.png'),
    default: require('@/assets/images/img/its-decision-time.android.png'),
});

export default function TabDecisionScreen() {
    const styles = getStyles()
    return (
        <VFull style={Styles.cContainer}>
            <Link href='/(tabs)/(decision)/who' style={styles.link}>
                <Image
                    resizeMode='contain'
                    source={img_url}
                    style={styles.foodImage}/>
            </Link>
            <Text color={Colors.$textDefault} style={styles.hintText}>(click the food to get going)</Text>
        </VFull>
    );
}

function getStyles() {
    return StyleSheet.create({
        foodImage: {
            objectFit: 'contain',
            maxWidth: '80%',
            height: 200,
        },
        link: {
            width: '100%',
            height: 'auto',
            textAlign: 'center',
        },
        hintText: {
            fontWeight: 'bold',
            marginTop: 20
        },
    });
}
