import {Button, ButtonProps, ButtonSize, Colors, TouchableOpacityProps} from "react-native-ui-lib";
import {Styles} from "@/constants/Styles";

export default function LargeBtn(props: ButtonProps) {
    return <Button size={ButtonSize.large}
                   borderRadius={10}
                   color='white'
                   labelStyle={Styles.lh26}
                   style={Styles.m15}
                   backgroundColor={Colors.$backgroundNeutralHeavy}
                   {...props}/>
}