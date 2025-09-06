import { View, ActivityIndicator, ViewStyle } from 'react-native';
import React, { FC } from 'react';
import { Colors } from '../../utils/theme/colors/Colors';

interface Props {
  color?: string;
  style?: ViewStyle;
  size?: number | 'small' | 'large' | undefined;
  rootStyle?: ViewStyle;
}
const LoadingIndicator: FC<Props> = ({
  color = Colors.white,
  style = {},
  size = 'small',
  rootStyle,
}) => {
  return (
    <View style={[{ flex: 1, justifyContent: 'center' }, rootStyle]}>
      <ActivityIndicator
        size={size}
        color={color}
        animating={true}
        style={style}
      />
    </View>
  );
};

export default LoadingIndicator;
