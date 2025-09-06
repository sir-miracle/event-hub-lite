import React, { FC } from 'react';
import Modal from 'react-native-modal';
import { ViewStyle } from 'react-native';

interface Props {
  isVisible: boolean;
  children: any;
  cancel?: () => void;
  style?: ViewStyle;
}
const CustomPlainModal: FC<Props> = ({
  isVisible = false,
  children,
  cancel,
  style,
}) => {
  return (
    <Modal
      style={[style]}
      isVisible={isVisible}
      onBackdropPress={cancel}
      onBackButtonPress={cancel}
      useNativeDriver
      animationOutTiming={200}
      backdropTransitionOutTiming={0}
      useNativeDriverForBackdrop
      hideModalContentWhileAnimating
    >
      {children}
    </Modal>
  );
};

export default CustomPlainModal;
