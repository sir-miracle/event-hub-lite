import React, { FC } from 'react';
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { moderateScale, scaleFont } from '../../utils/scaling';
import BackArrow from '../../assets/icons/arrow_back.svg';
import { Colors } from '../../utils/theme/colors/Colors';
import { CustomText } from '../../components/atoms';
import { FontsCatalogue } from '../../assets/fontsCatalogue';

interface Props {
  centerTitle?: string;
  onBackPress?: () => void;
  style?: ViewStyle;
  showBackArrow?: boolean;
  showCenterTitle?: boolean;
  showLeftComponent?: boolean;
  centerTitlestyle?: TextStyle;
  LeftComponent?: () => React.ReactNode;
  RightComponent?: () => React.ReactNode;
  backVewStyle?: StyleProp<ViewStyle>;
  isTitleToTheLeft?: boolean;
}
const SecondaryHeader: FC<Props> = ({
  centerTitle,
  onBackPress = () => {},
  style,
  centerTitlestyle,
  showBackArrow = true,
  showCenterTitle = true,
  showLeftComponent = true,
  LeftComponent,
  RightComponent,
  backVewStyle,
  isTitleToTheLeft,
}) => {
  return (
    <View style={[styles.root, style]}>
      {showLeftComponent ? (
        <>
          {LeftComponent ? (
            <LeftComponent />
          ) : (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {showBackArrow && (
                <TouchableOpacity
                  style={[styles.backVew, backVewStyle]}
                  onPress={onBackPress}
                  hitSlop={{ top: 5, bottom: 5, left: 10, right: 10 }}
                  activeOpacity={0.7}
                >
                  <BackArrow />
                </TouchableOpacity>
              )}
              {isTitleToTheLeft && showCenterTitle && (
                <CustomText style={[styles.title, centerTitlestyle]}>
                  {centerTitle}
                </CustomText>
              )}
            </View>
          )}
        </>
      ) : (
        <View />
      )}
      {!isTitleToTheLeft && showCenterTitle && (
        <CustomText style={[styles.title, centerTitlestyle]}>
          {centerTitle}
        </CustomText>
      )}
      {RightComponent && <RightComponent />}
    </View>
  );
};

export default SecondaryHeader;

const styles = StyleSheet.create({
  root: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: Colors.jet,
    fontSize: scaleFont(20),
    fontWeight: '600',
    lineHeight: moderateScale(28),
    fontFamily: FontsCatalogue.mazzardSemiBold,
  },
  backVew: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.white,
    marginRight: 20,
  },
});
