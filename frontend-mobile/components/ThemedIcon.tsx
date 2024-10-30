import Ionicons from '@expo/vector-icons/Ionicons';
import { type IconProps } from '@expo/vector-icons/build/createIconSet';
import { type ComponentProps } from 'react';
import { useThemeColor } from '@/hooks/useThemeColor';

export function ThemedIcon({ style, ...rest }: IconProps<ComponentProps<typeof Ionicons>['name']>) {
    const color = useThemeColor({ light: 'black', dark: 'white' }, 'text');

  return <Ionicons size={50} style={[{ marginBottom: -3 }, style]} {...rest} />;
}
