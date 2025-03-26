import {StyleSheet, Image, Platform} from 'react-native';
import {Link} from 'expo-router';
import {Styles} from '@/constants/Styles';
import {ThemedText} from "@/components/ThemedText";
import {SafeThemedView} from "@/components/SafeThemedView";

const img_url = Platform.select({
    ios: require('@/assets/images/img/its-decision-time.ios.png'),
    default: require('@/assets/images/img/its-decision-time.android.png'),
});


export default function TabDecisionScreen() {
    return (
        <SafeThemedView style={Styles.cContainer}>
            <Link href='/(tabs)/(decision)/going' style={styles.link}>
                <Image
                    resizeMode='contain'
                    source={img_url}
                    style={styles.foodImage}/>
            </Link>
            <ThemedText style={styles.hintText}>(click the food to get going)</ThemedText>
        </SafeThemedView>
    );
}

const styles = StyleSheet.create({
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
