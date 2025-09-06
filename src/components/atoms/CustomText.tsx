import React, { FC } from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextProps,
  TextStyle,
} from 'react-native';
import { Colors } from '../../utils/theme/colors/Colors';
import { FontsCatalogue } from '../../assets/fontsCatalogue';

interface Props extends TextProps {
  style?: StyleProp<TextStyle>;
  noLineHeight?: boolean;
  children?: string | React.ReactNode;
}

const CustomText: FC<Props> = ({ style, noLineHeight, children, ...props }) => {
  return (
    <Text
      {...props}
      style={[styles.textStyle, !noLineHeight && styles.lineHeight, style]}
    >
      {children}
    </Text>
  );
};

export default CustomText;

const styles = StyleSheet.create({
  textStyle: {
    color: Colors.charcoal,
    fontSize: 14,
    fontWeight: '500',
    fontFamily: FontsCatalogue.mazzardRegular,
    lineHeight: 20,
  },
  lineHeight: {
    lineHeight: 20,
  },
});
