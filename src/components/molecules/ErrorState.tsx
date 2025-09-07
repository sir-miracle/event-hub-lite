import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors } from '../../utils/theme/colors/Colors';
import { scaleFont, moderateScale, horizontalScale, verticalScale } from '../../utils/scaling';
import CustomText from '../atoms/CustomText';
import CustomButton from '../atoms/CustomButton';


interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  retryText?: string;
  showRetryButton?: boolean;
}

const ErrorState: FC<ErrorStateProps> = ({
  title = 'Something went wrong',
  message,
  onRetry,
  retryText = 'Try Again',
  showRetryButton = true,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <CustomText style={styles.icon}>⚠️</CustomText>
        
        <CustomText style={styles.title}>{title}</CustomText>
        
        <CustomText style={styles.message}>{message}</CustomText>
        
        {showRetryButton && onRetry && (
          <CustomButton
            label={retryText}
            onPress={onRetry}
            style={styles.retryButton}
            labelStyle={styles.retryButtonText}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: horizontalScale(32),
    paddingVertical: verticalScale(64),
  },
  content: {
    alignItems: 'center',
    maxWidth: horizontalScale(280),
  },
  icon: {
    fontSize: scaleFont(48),
    marginBottom: verticalScale(16),
  },
  title: {
    fontSize: scaleFont(18),
    fontWeight: '600',
    color: Colors.error,
    textAlign: 'center',
    marginBottom: verticalScale(8),
    lineHeight: moderateScale(24),
  },
  message: {
    fontSize: scaleFont(14),
    color: Colors.onSurfaceVariant,
    textAlign: 'center',
    marginBottom: verticalScale(24),
    lineHeight: moderateScale(20),
  },
  retryButton: {
    backgroundColor: Colors.primaryBlue,
    paddingHorizontal: horizontalScale(20),
    paddingVertical: verticalScale(10),
    borderRadius: moderateScale(6),
    minWidth: horizontalScale(100),
  },
  retryButtonText: {
    color: Colors.white,
    fontSize: scaleFont(14),
    fontWeight: '600',
  },
});

export default ErrorState;
