import {Image, ImageStyle, StyleProp} from "react-native";

const MAPPING = {
    'people.fill': require('@/assets/images/icon/icon-people.png'),
    'decision.fill': require('@/assets/images/icon/icon-decision.png'),
    'restaurants.fill': require('@/assets/images/icon/icon-restaurants.png'),
};

export type IconImageName = keyof typeof MAPPING;

export function IconImage({name, size = 24, color, style}: {
    name: IconImageName;
    size?: number;
    color?: string;
    style?: StyleProp<ImageStyle>;
}) {
    return <Image tintColor={color} source={MAPPING[name]} style={[style, {
        width: size,
        height: size,
    }]}/>
}