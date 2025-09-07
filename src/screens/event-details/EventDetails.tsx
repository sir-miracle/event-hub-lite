import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';

import { Colors } from '../../utils/theme/colors/Colors';
import {
  scaleFont,
  moderateScale,
  horizontalScale,
  verticalScale,
} from '../../utils/scaling';
import { CustomText, CustomButton } from '../../components/atoms';
import { ErrorState } from '../../components/molecules';
import mockApiService from '../../services/mockApiService';
import databaseService from '../../services/databaseService';
import { AppRootWrapper } from '../../components/organisms';
import { SecondaryHeader } from '../../components/molecules';
import { width } from '../../utils/utility-functions/UntilityFunctions';
import { FontsCatalogue } from '../../assets/fontsCatalogue';
import { TextConstants } from '../../utils/text-constants/TextConstants';

const EventDetails = ({ navigation, route }) => {
  const routeData = route.params?.event;
  const [eventDetails, setEventDetails] = useState<any>(routeData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);

  const loadEventDetails = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Try to load from API first
      try {
        const response = await mockApiService.getEventDetails(routeData?.id);
        setEventDetails(response.event);

        // Cache in database
        await databaseService.saveEventDetails(response.event);
      } catch (apiError) {
        // If API fails, try to load from database
        console.log('API failed, loading from database:', apiError);
        const dbEvent = await databaseService.getEventById(routeData?.id);

        if (dbEvent) {
          setEventDetails(dbEvent);
        } else {
          throw new Error('Event not found');
        }
      }

      // Check if event is favorite
      const favoriteStatus = await databaseService.isFavorite(routeData?.id);
      setIsFavorite(favoriteStatus);
    } catch (err) {
      console.error('Error loading event details:', err);
      setError(
        err instanceof Error ? err.message : 'Failed to load event details',
      );
    } finally {
      setLoading(false);
    }
  }, [routeData]);

  const handleFavoriteToggle = useCallback(async () => {
    try {
      const newFavoriteStatus = await databaseService.toggleFavorite(
        routeData?.id,
      );
      setIsFavorite(newFavoriteStatus);
    } catch (error) {
      console.error('Error toggling favorite:', error);
      Alert.alert(
        TextConstants.ERROR,
        TextConstants.FAILED_TO_UPDATE_FAVORITE_STATUS,
      );
    }
  }, [routeData]);

  const handleCheckout = useCallback(() => {
    if (eventDetails?.remaining === 0) {
      Alert.alert(
        TextConstants.SOLD_OUT,
        TextConstants.THIS_EVENT_IS_SOLD_OUT_YOU_CAN_JOIN_THE_WAITLIST,
      );
      return;
    }

    navigation.navigate('CheckoutStack', {
      screen: 'Checkout',
      params: { event: eventDetails },
    });
  }, [eventDetails]);

  useEffect(() => {
    loadEventDetails();
  }, []);

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      time: date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      }),
    };
  };

  const formatPrice = (price: number) => {
    return `₦${price.toLocaleString()}`;
  };

  const getAvailabilityStatus = () => {
    if (!eventDetails)
      return {
        status: 'available',
        color: Colors.available,
        text: TextConstants.AVAILABLE,
      };

    if (eventDetails.remaining === 0) {
      return {
        status: 'sold_out',
        color: Colors.soldOut,
        text: TextConstants.SOLD_OUT,
      };
    }

    if (eventDetails.remaining < 10) {
      return {
        status: 'limited',
        color: Colors.limited,
        text: TextConstants.LIMITED_SPOTS,
      };
    }

    return {
      status: 'available',
      color: Colors.available,
      text: TextConstants.AVAILABLE,
    };
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Tech':
        return Colors.tech;
      case 'Business':
        return Colors.business;
      case 'Health':
        return Colors.health;
      case 'Arts':
        return Colors.arts;
      case 'Education':
        return Colors.education;
      default:
        return Colors.primaryBlue;
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primaryBlue} />
      </View>
    );
  }

  if (error) {
    return <ErrorState message={error} onRetry={loadEventDetails} />;
  }

  if (!eventDetails) {
    return <ErrorState message="Event not found" onRetry={loadEventDetails} />;
  }

  const { date, time } = formatDateTime(eventDetails.startsAt);
  const availability = getAvailabilityStatus();
  const categoryColor = getCategoryColor(eventDetails.category);

  return (
    <AppRootWrapper
      contentContainerStyle={{ justifyContent: 'space-between' }}
      enableScroll={true}
      Header={() => (
        <SecondaryHeader
          onBackPress={() => navigation.goBack()}
          centerTitle={TextConstants.EVENT_DETAILS}
          isTitleToTheLeft
          RightComponent={() => (
            <CustomButton
              label={
                eventDetails.remaining === 0
                  ? TextConstants.JOIN_WAITLIST
                  : TextConstants.GET_TICKETS
              }
              onPress={handleCheckout}
              style={[
                styles.checkoutButton,
                eventDetails.remaining === 0 && styles.waitlistButton,
              ]}
            />
          )}
        />
      )}
    >
      <View style={{ alignItems: 'center', marginTop: 20, width: '100%' }}>
        <View style={styles.imageContainer}>
          <View style={styles.image}>
            <Image
              source={{ uri: eventDetails.thumbnail }}
              style={{ width: '100%', height: '100%' }}
              resizeMode="cover"
            />
          </View>
          <View
            style={[styles.categoryBadge, { backgroundColor: categoryColor }]}
          >
            <CustomText style={styles.categoryText}>
              {eventDetails.category}
            </CustomText>
          </View>
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={handleFavoriteToggle}
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
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.titleRow}>
            <CustomText style={styles.title}>{eventDetails?.title}</CustomText>
            <CustomText style={styles.price}>
              {formatPrice(eventDetails?.price)}
            </CustomText>
          </View>

          <View style={styles.divider} />

          <View style={styles.dateTimeContainer}>
            <View style={styles.dateTimeItem}>
              <CustomText style={styles.dateTimeLabel}>
                📅 {TextConstants.DATE}
              </CustomText>
              <CustomText style={styles.dateTimeValue}>{date}</CustomText>
            </View>
            <View style={styles.dateTimeItem}>
              <CustomText style={styles.dateTimeLabel}>
                🕐 {TextConstants.TIME}
              </CustomText>
              <CustomText style={styles.dateTimeValue}>{time}</CustomText>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.section}>
            <CustomText style={styles.sectionTitle}>
              📍 {TextConstants.VENUE}
            </CustomText>
            <CustomText style={styles.sectionContent}>
              {eventDetails?.venue}
            </CustomText>
          </View>

          <View style={styles.divider} />

          <View style={styles.section}>
            <CustomText style={styles.sectionTitle}>
              📝 {TextConstants.ABOUT}
            </CustomText>
            <CustomText style={styles.sectionContent}>
              {eventDetails?.description}
            </CustomText>
          </View>

          <View style={styles.divider} />

          {eventDetails?.speakers && eventDetails?.speakers?.length > 0 && (
            <View style={styles.section}>
              <CustomText style={styles.sectionTitle}>
                🎤 {TextConstants.SPEAKERS}
              </CustomText>
              {eventDetails?.speakers?.map((speaker: string, index: number) => (
                <View key={index} style={styles.speakerItem}>
                  <CustomText style={styles.speakerBullet}>•</CustomText>
                  <CustomText style={styles.speakerName}>{speaker}</CustomText>
                </View>
              ))}
            </View>
          )}

          <View style={styles.divider} />

          <View style={styles.section}>
            <CustomText style={styles.sectionTitle}>
              🎫 {TextConstants.AVAILABILITY}
            </CustomText>
            <View style={styles.availabilityContainer}>
              <View
                style={[
                  styles.availabilityBadge,
                  { backgroundColor: availability?.color },
                ]}
              >
                <CustomText style={styles.availabilityText}>
                  {availability?.text}
                </CustomText>
              </View>
              <CustomText style={styles.availabilityDetails}>
                {eventDetails?.remaining} of {eventDetails?.capacity}{' '}
                {TextConstants.SPOTS}
                {TextConstants.REMAINING}
              </CustomText>
            </View>
          </View>
          <View style={styles.divider} />
        </View>
      </View>
    </AppRootWrapper>
  );
};

const styles = StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: Colors.outline,
    marginVertical: 15,
    width: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  imageContainer: {
    height: 250,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  image: {
    width: width,
    height: 250,
    marginRight: 'auto',
    marginLeft: 'auto',
    alignItems: 'center',
  },
  categoryBadge: {
    position: 'absolute',
    top: verticalScale(16),
    left: horizontalScale(16),
    paddingHorizontal: horizontalScale(12),
    paddingVertical: verticalScale(6),
    borderRadius: moderateScale(16),
  },
  categoryText: {
    color: Colors.white,
    fontSize: scaleFont(12),
    fontWeight: '600',
  },
  favoriteButton: {
    position: 'absolute',
    top: verticalScale(16),
    right: horizontalScale(16),
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(20),
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  favoriteIcon: {
    fontSize: scaleFont(20),
    fontWeight: 'bold',
    lineHeight: 26,
  },
  contentContainer: {
    width: '100%',
    marginTop: 16,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(16),
    width: '100%',
  },
  title: {
    fontSize: scaleFont(20),
    fontWeight: '500',
    fontFamily: FontsCatalogue.mazzardBold,
    color: Colors.onBackground,
    lineHeight: moderateScale(26),
    width: '60%',
  },
  price: {
    fontSize: scaleFont(18),
    fontWeight: '500',
    color: Colors.primaryBlue,
    fontFamily: FontsCatalogue.mazzardBold,
    width: '40%',
    textAlign: 'right',
    alignItems: 'flex-end',
  },
  dateTimeContainer: {
    flexDirection: 'row',
    marginBottom: verticalScale(24),
  },
  dateTimeItem: {
    flex: 1,
    marginRight: horizontalScale(16),
  },
  dateTimeLabel: {
    fontSize: scaleFont(14),
    fontWeight: '600',
    color: Colors.onSurfaceVariant,
    marginBottom: verticalScale(4),
  },
  dateTimeValue: {
    fontSize: scaleFont(14),
    color: Colors.onSurface,
    lineHeight: moderateScale(20),
    fontFamily: FontsCatalogue.mazzardRegular,
  },
  section: {
    marginBottom: verticalScale(24),
  },
  sectionTitle: {
    fontSize: scaleFont(18),
    fontWeight: '600',
    color: Colors.onBackground,
    marginBottom: verticalScale(8),
  },
  sectionContent: {
    fontSize: scaleFont(15),
    color: Colors.onSurface,
    lineHeight: moderateScale(24),
    fontFamily: FontsCatalogue.mazzardRegular,
  },
  speakerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(4),
  },
  speakerBullet: {
    fontSize: scaleFont(16),
    color: Colors.primaryBlue,
    marginRight: horizontalScale(8),
  },
  speakerName: {
    fontSize: scaleFont(16),
    color: Colors.onSurface,
    flex: 1,
  },
  availabilityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  availabilityBadge: {
    paddingHorizontal: horizontalScale(12),
    paddingVertical: verticalScale(6),
    borderRadius: moderateScale(16),
    marginRight: horizontalScale(12),
  },
  availabilityText: {
    color: Colors.white,
    fontSize: scaleFont(12),
    fontWeight: '600',
  },
  availabilityDetails: {
    fontSize: scaleFont(14),
    color: Colors.onSurfaceVariant,
  },
  checkoutButton: {
    backgroundColor: Colors.primaryBlue,
    width: undefined,
    paddingHorizontal: horizontalScale(20),
    height: 30,
    marginRight: undefined,
  },
  waitlistButton: {
    backgroundColor: Colors.warningOrange,
  },
});

export default EventDetails;
