import React, { FC } from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Event } from '../../types';
import { Colors } from '../../utils/theme/colors/Colors';
import {
  scaleFont,
  moderateScale,
  horizontalScale,
  verticalScale,
} from '../../utils/scaling';
import CustomText from '../atoms/CustomText';
import { FontsCatalogue } from '../../assets/fontsCatalogue';
import {
  formatDate,
  formatPrice,
  formatTime,
  getCategoryColor,
} from '../../utils/utility-functions/UntilityFunctions';

interface EventCardProps {
  event: Event;
  onPress: (event: Event) => void;
  onFavoritePress?: () => void;
  isFavorite?: boolean;
  showFavoriteButton?: boolean;
}

const EventCard: FC<EventCardProps> = ({
  event,
  onPress,
  onFavoritePress,
  isFavorite = false,
  showFavoriteButton = true,
}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(event)}
      activeOpacity={0.8}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: event?.thumbnail }} style={styles.image} />
        <View
          style={[
            styles.categoryBadge,
            { backgroundColor: getCategoryColor(event?.category) },
          ]}
        >
          <CustomText style={styles.categoryText}>{event?.category}</CustomText>
        </View>
        {showFavoriteButton && (
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={onFavoritePress}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <CustomText
              style={[
                styles.favoriteIcon,
                { color: isFavorite ? Colors.favorite : Colors.notFavorite },
              ]}
            >
              {isFavorite ? '♥' : '♡'}
            </CustomText>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.contentContainer}>
        <CustomText style={styles.title} numberOfLines={2}>
          {event?.title}
        </CustomText>

        <View style={styles.detailsRow}>
          <View style={styles.dateTimeContainer}>
            <CustomText style={styles.dateText}>
              {formatDate(event?.startsAt)}
            </CustomText>
            <CustomText style={styles.timeText}>
              {formatTime(event?.startsAt)}
            </CustomText>
          </View>
          <CustomText style={styles.cityText}>{event?.city}</CustomText>
        </View>

        <View style={styles.priceRow}>
          <CustomText style={styles.priceText}>
            {formatPrice(event?.price)}
          </CustomText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: moderateScale(12),
    marginHorizontal: horizontalScale(16),
    marginVertical: verticalScale(8),
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: {
    position: 'relative',
    height: verticalScale(180),
    borderTopLeftRadius: moderateScale(12),
    borderTopRightRadius: moderateScale(12),
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  categoryBadge: {
    position: 'absolute',
    top: verticalScale(12),
    left: horizontalScale(12),
    paddingHorizontal: horizontalScale(12),
    paddingVertical: verticalScale(6),
    borderRadius: moderateScale(16),
  },
  categoryText: {
    color: Colors.white,
    fontSize: scaleFont(12),
    fontWeight: '500',
    fontFamily: FontsCatalogue.mazzardRegular,
  },
  favoriteButton: {
    position: 'absolute',
    top: verticalScale(12),
    right: horizontalScale(12),
    width: moderateScale(32),
    height: moderateScale(32),
    borderRadius: moderateScale(16),
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  favoriteIcon: {
    fontSize: scaleFont(16),
    fontWeight: 'bold',
    lineHeight: 24,
  },
  contentContainer: {
    padding: moderateScale(16),
  },
  title: {
    fontSize: scaleFont(18),
    fontWeight: '500',
    fontFamily: FontsCatalogue.mazzardRegular,
    color: Colors.onBackground,
    marginBottom: verticalScale(8),
    lineHeight: moderateScale(24),
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(8),
  },
  dateTimeContainer: {
    flex: 1,
  },
  dateText: {
    fontSize: scaleFont(14),
    fontWeight: '500',
    color: Colors.onSurface,
    marginBottom: verticalScale(2),
    fontFamily: FontsCatalogue.mazzardRegular,
  },
  timeText: {
    fontSize: scaleFont(12),
    color: Colors.onSurfaceVariant,
  },
  cityText: {
    fontSize: scaleFont(14),
    fontWeight: '500',
    color: Colors.primaryBlue,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceText: {
    fontSize: scaleFont(16),
    fontWeight: '700',
    color: Colors.primaryBlue,
  },
});

export default EventCard;
