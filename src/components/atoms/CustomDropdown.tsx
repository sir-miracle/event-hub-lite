import React, { FC } from 'react';
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import ArrowDown from '../../assets/icons/arrow_down_black.svg';
import { Colors } from '../../utils/theme/colors/Colors';
import CustomText from './CustomText';
import { FontsCatalogue } from '../../assets/fontsCatalogue';
import { height } from '../../utils/utility-functions/UntilityFunctions';

interface Props {
  title?: string;
  titleStyle?: TextStyle;
  text: string;
  showTitle?: boolean;
  showArrowDown?: boolean;
  onClick: () => void;
  style?: object;
  notClickable?: boolean;
  textStyle?: TextStyle;
  bodyRapperStyle?: ViewStyle;
  DropdownIcon?: any;
  placeHolder?: string;
  leftComponent?: React.JSX.Element;
}
const CustomDropdown: FC<Props> = ({
  title,
  titleStyle,
  showTitle = true,
  showArrowDown = true,
  text,
  onClick = () => {},
  style,
  notClickable = false,
  textStyle,
  bodyRapperStyle,
  DropdownIcon,
  placeHolder,
  leftComponent,
}) => {
  return (
    <View style={[styles.rootView, style]}>
      {showTitle && (
        <CustomText style={[styles.title, titleStyle]}>{title}</CustomText>
      )}
      <TouchableOpacity
        style={[styles.bodyRapper, bodyRapperStyle]}
        onPress={onClick}
        disabled={notClickable}
      >
        <View
          style={{ flexDirection: 'row', width: '80%', alignItems: 'center' }}
        >
          {leftComponent && leftComponent}
          <Text style={[styles.text, textStyle]} numberOfLines={1}>
            {text?.length > 0 ? text : placeHolder}
          </Text>
        </View>
        {showArrowDown && (
          <>{DropdownIcon ? <DropdownIcon /> : <ArrowDown />}</>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default CustomDropdown;

const styles = StyleSheet.create({
  text: {
    width: '95%',
    color: Colors.outerSpace,
    fontFamily: FontsCatalogue.mazzardRegular,
    fontSize: 14,
    marginLeft: 8,
  },
  title: {
    alignSelf: 'flex-start',
    marginBottom: 10,
    fontSize: 14,
    fontWeight: '500',
    color: Colors.raisinBlack,
    fontFamily: FontsCatalogue.mazzardRegular,
  },
  rootView: {
    width: '100%',
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  bodyRapper: {
    width: '100%',
    borderRadius: 8,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    height: height * 0.065,
    marginRight: 'auto',
    marginLeft: 'auto',
    borderColor: Colors.brightGrey,
    borderWidth: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
});
