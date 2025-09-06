import {
  KeyboardType,
  ReturnKeyTypeOptions,
  StyleSheet,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, { FC, useState } from 'react';
import { moderateScale, scaleFont } from '../../utils/scaling';
import { Colors } from '../../utils/theme/colors/Colors';
import { CustomText } from '../../components/atoms';
import EyeOpen from '../../assets/icons/eye_open.svg';
import EyeClosed from '../../assets/icons/eye_closed.svg';
import { FontsCatalogue } from '../../assets/fontsCatalogue';
import { height } from '../../utils/utility-functions/UntilityFunctions';

interface Props {
  placeholder: string;
  value: string;
  onChangeText: (val: string) => void;
  style?: TextStyle;
  rootStyle?: ViewStyle;
  isForPassword?: boolean;
  keyboardType?: KeyboardType;
  editable?: boolean;
  placeholderStyle?: string;
  onEnterPressed?: () => void;
  returnKeyType?: ReturnKeyTypeOptions;
  disabled?: boolean;
  maxLength?: number;
  numberOfLines?: number;
  multiline?: boolean;
  autoCorrect?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
  headerText?: string;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
  headerTextStyle?: TextStyle;
  wrapperStyle?: ViewStyle;
  error?: boolean;
  leftIcon?: React.ReactNode;
  onLeftIconPress?: () => void;
}
const CustomInput: FC<Props> = ({
  wrapperStyle,
  headerTextStyle,
  headerText,
  placeholder,
  placeholderStyle,
  value,
  onChangeText = () => {},
  style,
  rootStyle,
  isForPassword = false,
  editable = true,
  maxLength,
  numberOfLines = 1,
  multiline = false,
  autoCorrect = false,
  keyboardType = 'default',
  onEnterPressed = () => {},
  returnKeyType = 'next',
  onBlur = () => {},
  onFocus = () => {},
  rightIcon,
  onRightIconPress,
  error = false,
  leftIcon,
  onLeftIconPress,
}) => {
  const [focus, setFocus] = useState<boolean>(false);
  const [isSecureEntry, setIsSecureEntry] = useState(true);

  return (
    <View style={[{ width: '100%' }, wrapperStyle]}>
      {headerText && (
        <CustomText style={[styles.headerText, headerTextStyle]}>
          {headerText}
        </CustomText>
      )}
      <View
        style={[styles.root, focus && {}, error && styles.errorRoot, rootStyle]}
      >
        {leftIcon && (
          <View style={{ marginRight: 15, width: '10%' }}>
            <TouchableOpacity onPress={onLeftIconPress}>
              {leftIcon}
            </TouchableOpacity>
          </View>
        )}
        <TextInput
          secureTextEntry={isForPassword && isSecureEntry}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          style={[styles.input, error && styles.errorInput, style]}
          onFocus={() => {
            setFocus(true);
            onFocus();
          }}
          onBlur={() => {
            setFocus(false);
            onBlur();
          }}
          maxLength={maxLength}
          numberOfLines={numberOfLines}
          multiline={multiline}
          autoCorrect={autoCorrect}
          editable={editable}
          placeholderTextColor={
            placeholderStyle ? placeholderStyle : Colors.romanSilver
          }
          keyboardType={keyboardType}
          returnKeyType={returnKeyType}
          onSubmitEditing={onEnterPressed}
        />

        {isForPassword && (
          <View style={styles.eyeContainer}>
            <TouchableOpacity
              onPress={() => setIsSecureEntry(!isSecureEntry)}
              style={{ padding: 10 }}
            >
              {isSecureEntry ? <EyeClosed /> : <EyeOpen />}
            </TouchableOpacity>
          </View>
        )}
        {rightIcon && (
          <View style={styles.eyeContainer}>
            <TouchableOpacity onPress={onRightIconPress}>
              {rightIcon}
            </TouchableOpacity>
          </View>
        )}
        {!isForPassword && !rightIcon && <View style={{ flex: 1 }} />}
      </View>
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  bar: {
    width: 21,
    height: 2,
    backgroundColor: Colors.lightSilver,
    top: 7,
    transform: [{ rotate: '45deg' }],
    position: 'absolute',
  },
  eyeContainer: {
    maxWidth: '20%',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  headerText: {
    color: Colors.raisinBlack,
    fontFamily: FontsCatalogue.mazzardSemiBold,
    fontWeight: '400',
    fontSize: scaleFont(16),
    lineHeight: moderateScale(20),
    marginBottom: 8,
  },
  input: {
    width: '70%',
    color: Colors.raisinBlack,
    fontWeight: '400',
    fontSize: scaleFont(16),
    fontFamily: FontsCatalogue.mazzardRegular,
    alignItems: 'flex-start',
    textAlign: 'left',
  },
  root: {
    width: '100%',
    height: height * 0.065,
    backgroundColor: Colors.white,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    borderRadius: 8,
    marginRight: 'auto',
    marginLeft: 'auto',
    borderWidth: 1,
    borderColor: Colors.brightGrey,
    flexDirection: 'row',
    alignItems: 'center',
  },
  errorRoot: {
    backgroundColor: Colors.red30,
  },
  errorInput: {
    color: Colors.red10,
  },
});
