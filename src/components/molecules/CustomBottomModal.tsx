import React, { FC } from 'react';
import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import { height, width } from '../../utils/utility-functions/UntilityFunctions';
import Cancel from '../../assets/icons/cancel_icon.svg';
import { Colors } from '../../utils/theme/colors/Colors';
import { CustomText } from '../../components/atoms';
import { FontsCatalogue } from '../../assets/fontsCatalogue';
import Modal from 'react-native-modal';
import { moderateScale } from '../../utils/scaling';

interface Props {
  modalVisible: boolean;
  closeModal: () => void;
  children: any;
  headerText?: string;
  scrollOffset?: number;
  style?: ViewStyle;
  isDragToClose?: boolean;
  headerStyle?: ViewStyle;
  headerTextStyle?: ViewStyle;
  showClose?: boolean;
  useConstantHeight?: boolean;
  constantHeight?: number;
  centerHeader?: boolean;
  useTop?: boolean;
}
const CustomBottomModal: FC<Props> = ({
  modalVisible,
  closeModal = () => {},
  headerText,
  scrollOffset = 6,
  children,
  style,
  isDragToClose = true,
  headerStyle,
  headerTextStyle,
  showClose = true,
  useConstantHeight = false,
  constantHeight = height * 0.85,
  centerHeader = false,
  useTop = true,
}) => {
  return (
    <View>
      <Modal
        animationOut={'zoomOutUp'}
        isVisible={modalVisible}
        coverScreen={true}
        backdropOpacity={0.3}
        onSwipeComplete={closeModal}
        swipeDirection={isDragToClose ? ['down'] : []}
        onBackButtonPress={closeModal}
        onBackdropPress={closeModal}
        scrollOffset={scrollOffset}
        propagateSwipe={true}
        style={[styles.modalRoot, style]}
      >
        <View
          style={[styles.root, useConstantHeight && { height: constantHeight }]}
        >
          <View style={styles.stud} />
          {useTop && (
            <View style={[styles.top, headerStyle]}>
              {centerHeader && <View />}
              <CustomText style={[styles.header, headerTextStyle]}>
                {headerText}
              </CustomText>
              {showClose && (
                <TouchableOpacity style={styles.btnView} onPress={closeModal}>
                  <Cancel />
                </TouchableOpacity>
              )}
            </View>
          )}
          <View>{children}</View>
        </View>
      </Modal>
    </View>
  );
};

export default CustomBottomModal;

const styles = StyleSheet.create({
  stud: {
    width: moderateScale(36),
    height: moderateScale(5),
    backgroundColor: '#656C754D',
    borderRadius: 16,
    alignSelf: 'center',
  },
  top: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingVertical: 8,
  },
  root: {
    width: width,
    minHeight: height * 0.3,
    maxHeight: height * 0.9,
    backgroundColor: Colors.white,
    borderRadius: 12,
    paddingBottom: 20,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  modalRoot: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    margin: 0,
  },
  btnView: {
    width: 25,
    height: 25,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DEDEDE',
  },
  header: {
    color: Colors.raisinBlack,
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
    fontFamily: FontsCatalogue.mazzardRegular,
  },
});
