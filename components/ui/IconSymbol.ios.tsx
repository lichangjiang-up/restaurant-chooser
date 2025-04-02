import {SymbolView, SymbolViewProps, SymbolWeight} from 'expo-symbols';
import {StyleProp, ViewStyle} from 'react-native';

export function IconSymbol({
                               name,
                               color,
                               style,
                               size = 24,
                               weight = 'regular',
                           }: {
    name: SymbolViewProps['name'];
    size?: number;
    color: string;
    style?: StyleProp<ViewStyle>;
    weight?: SymbolWeight;
}) {
    return (
        <SymbolView
            weight={weight}
            tintColor={color}
            resizeMode="scaleAspectFit"
            name={name}
            style={[{width: size, height: size}, style]}
        />
    );
}
