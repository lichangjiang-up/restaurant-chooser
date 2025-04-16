import {Modal, ModalProps, Pressable, StyleSheet, View} from "react-native";
import {Styles, VSP} from "@/constants/Styles";
import {Colors} from "@/constants/Colors";

type ContainerProps = {
    onPress?: () => void;
    containerStyle?: VSP;
    maskColor?: string;
}


export default function MyModal({
                                    onDismiss,
                                    onPress,
                                    children,
                                    containerStyle,
                                    maskColor,
                                    ...otherProps
                                }: ModalProps & ContainerProps) {
    return <Modal
        statusBarTranslucent={true}
        animationType='none'
        transparent={true}
        onRequestClose={onDismiss}
        {...otherProps}>
        <Pressable onPress={onPress}
                   style={[Styles.hw100, styles.modalBg, {backgroundColor: maskColor || Colors.mask}]}>
            <View style={containerStyle || styles.modalContent}>
                {children}
            </View>
        </Pressable>
    </Modal>
}

const styles = StyleSheet.create({
    modalBg: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalContent: {
        width: '86%',
        height: 'auto',
        marginTop: '-10%',
        backgroundColor: 'white',
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 10,
        maxHeight: '70%',
    },
});