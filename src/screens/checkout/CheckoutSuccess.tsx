import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../../utils/theme/colors/Colors';
import {
  scaleFont,
  moderateScale,
  horizontalScale,
  verticalScale,
} from '../../utils/scaling';
import { CustomText, CustomButton } from '../../components/atoms';
import { TextConstants } from '../../utils/text-constants/TextConstants';

const CheckoutSuccess = ({ navigation, route }) => {
  const { reference } = route?.params;

  const handleBackToEvents = () => {
    navigation.navigate('BottomNavStack');
  };

  const handleViewFavorites = () => {
    navigation.navigate('BottomNavStack', { screen: 'Favorites' });
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <CustomText style={styles.successIcon}>✅</CustomText>
        </View>

        <CustomText style={styles.title}>
          {TextConstants.PAYMENT_SUCCESSFUL}
        </CustomText>
        <CustomText style={styles.message}>
          {TextConstants.YOUR_TICKETS_HAVE_BEEN_CONFIRMED}
        </CustomText>

        <View style={styles.referenceContainer}>
          <CustomText style={styles.referenceLabel}>
            {TextConstants.REFERENCE_NUMBER}
          </CustomText>
          <CustomText style={styles.referenceValue}>{reference}</CustomText>
        </View>

        <View style={styles.buttonContainer}>
          <CustomButton
            label={TextConstants.BACK_TO_EVENTS}
            onPress={handleBackToEvents}
            style={styles.primaryButton}
          />

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={handleViewFavorites}
            activeOpacity={0.7}
          >
            <CustomText style={styles.secondaryButtonText}>
              {TextConstants.VIEW_FAVORITES}
            </CustomText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: horizontalScale(32),
  },
  iconContainer: {
    width: moderateScale(80),
    height: moderateScale(80),
    borderRadius: moderateScale(40),
    backgroundColor: Colors.successGreenLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(24),
  },
  successIcon: {
    fontSize: scaleFont(30),
    lineHeight: 40,
  },
  title: {
    fontSize: scaleFont(24),
    fontWeight: '700',
    color: Colors.onBackground,
    textAlign: 'center',
    marginBottom: verticalScale(16),
    lineHeight: moderateScale(32),
  },
  message: {
    fontSize: scaleFont(16),
    color: Colors.onSurfaceVariant,
    textAlign: 'center',
    marginBottom: verticalScale(32),
    lineHeight: moderateScale(24),
  },
  referenceContainer: {
    backgroundColor: Colors.white,
    padding: horizontalScale(20),
    borderRadius: moderateScale(12),
    marginBottom: verticalScale(32),
    width: '100%',
    alignItems: 'center',
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  referenceLabel: {
    fontSize: scaleFont(14),
    color: Colors.onSurfaceVariant,
    marginBottom: verticalScale(8),
  },
  referenceValue: {
    fontSize: scaleFont(18),
    fontWeight: '700',
    color: Colors.primaryBlue,
    fontFamily: 'monospace',
  },
  buttonContainer: {
    width: '100%',
  },
  primaryButton: {
    backgroundColor: Colors.primaryBlue,
    marginBottom: verticalScale(16),
  },
  secondaryButton: {
    paddingVertical: verticalScale(12),
    paddingHorizontal: horizontalScale(24),
    borderRadius: moderateScale(8),
    borderWidth: 1,
    borderColor: Colors.primaryBlue,
    alignItems: 'center',
  },
  secondaryButtonText: {
    fontSize: scaleFont(16),
    fontWeight: '600',
    color: Colors.primaryBlue,
  },
});

export default CheckoutSuccess;
