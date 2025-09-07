import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors } from '../../utils/theme/colors/Colors';
import {
  scaleFont,
  moderateScale,
  horizontalScale,
  verticalScale,
} from '../../utils/scaling';
import CustomText from '../atoms/CustomText';
import CustomButton from '../atoms/CustomButton';

interface EmptyStateProps {
  type: 'no_events' | 'no_favorites' | 'no_search_results' | 'error';
  title: string;
  message: string;
  actionText?: string;
  onActionPress?: () => void;
  icon?: string;
}

const EmptyState: FC<EmptyStateProps> = ({
  type,
  title,
  message,
  actionText,
  onActionPress,
  icon,
}) => {
  const getDefaultIcon = (): string => {
    switch (type) {
      case 'no_events':
        return '📅';
      case 'no_favorites':
        return '❤️';
      case 'no_search_results':
        return '🔍';
      case 'error':
        return '⚠️';
      default:
        return '📋';
    }
  };

  const getDefaultActionText = (): string => {
    switch (type) {
      case 'no_events':
        return 'Refresh';
      case 'no_favorites':
        return 'Browse Events';
      case 'no_search_results':
        return 'Clear Filters';
      case 'error':
        return 'Try Again';
      default:
        return 'Retry';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <CustomText style={styles.icon}>{icon || getDefaultIcon()}</CustomText>

        <CustomText style={styles.title}>{title}</CustomText>

        <CustomText style={styles.message}>{message}</CustomText>

        {(actionText || onActionPress) && (
          <CustomButton
            label={actionText || getDefaultActionText()}
            onPress={onActionPress || (() => {})}
            style={styles.actionButton}
            labelStyle={styles.actionButtonText}
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
    fontSize: scaleFont(64),
    marginBottom: verticalScale(24),
    lineHeight: moderateScale(80),
  },
  title: {
    fontSize: scaleFont(20),
    fontWeight: '600',
    color: Colors.onSurface,
    textAlign: 'center',
    marginBottom: verticalScale(12),
    lineHeight: moderateScale(28),
  },
  message: {
    fontSize: scaleFont(16),
    color: Colors.onSurfaceVariant,
    textAlign: 'center',
    marginBottom: verticalScale(32),
    lineHeight: moderateScale(24),
  },
  actionButton: {
    backgroundColor: Colors.primaryBlue,
    paddingHorizontal: horizontalScale(24),
    paddingVertical: verticalScale(12),
    borderRadius: moderateScale(8),
    minWidth: horizontalScale(120),
  },
  actionButtonText: {
    color: Colors.white,
    fontSize: scaleFont(16),
    fontWeight: '600',
  },
});

export default EmptyState;
