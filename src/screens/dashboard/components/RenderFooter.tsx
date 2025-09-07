import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Colors } from '../../../utils/theme/colors/Colors';
import { LoadingIndicator } from '../../../components/molecules';
import { verticalScale } from '../../../utils/scaling';

const RenderFooter = ({ loadingMore }: { loadingMore: boolean }) => {
  if (!loadingMore) return null;

  return (
    <View style={styles.footerLoader}>
      <LoadingIndicator color={Colors.primaryBlue} />
    </View>
  );
};

export default RenderFooter;

const styles = StyleSheet.create({
  footerLoader: {
    paddingVertical: verticalScale(20),
    alignItems: 'center',
  },
});
