import React, { FC } from 'react';
import {
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { Colors } from '../../utils/theme/colors/Colors';
import CustomText from './CustomText';
import { FontsCatalogue } from '../../assets/fontsCatalogue';
import { height } from '../../utils/utility-functions/UntilityFunctions';
import { moderateScale } from '../../utils/scaling';
import { scaleFont } from '../../utils/scaling';
import { LoadingIndicator } from '../molecules';

interface Props {
  onPress: () => void;
  label: string | undefined;
  style?: ViewStyle;
  labelStyle?: TextStyle;
  disabled?: boolean;
  loading?: boolean;
}

const CustomButton: FC<Props> = ({
  onPress = () => {},
  label,
  style,
  labelStyle,
  disabled = false,
  loading = false,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[
        styles.buttonStyle,
        disabled && { backgroundColor: Colors.coralRedLight },
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <LoadingIndicator color={Colors.white} />
      ) : (
        <CustomText style={[styles.labelstyle, labelStyle]}>{label}</CustomText>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  buttonStyle: {
    width: '100%',
    height: height * 0.059,
    backgroundColor: Colors.coralRed,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    borderRadius: 8,
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  labelstyle: {
    color: Colors.white,
    fontSize: scaleFont(16),
    fontWeight: '600',
    lineHeight: moderateScale(20),
    fontFamily: FontsCatalogue.mazzardSemiBold,
  },
});
