import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { EventDetails } from '../../types';
import { Colors } from '../../utils/theme/colors/Colors';
import {
  scaleFont,
  moderateScale,
  horizontalScale,
  verticalScale,
} from '../../utils/scaling';
import { CustomText, CustomInput, CustomButton } from '../../components/atoms';
import { SecondaryHeader } from '../../components/molecules';
import { AppRootWrapper } from '../../components/organisms';
import {
  validateEmail,
  validateNumbers,
} from '../../utils/utility-functions/UntilityFunctions';
import { TextConstants } from '../../utils/text-constants/TextConstants';

const Checkout = ({ navigation, route }) => {
  const routeData = route?.params?.event;
  const [eventDetails, _] = useState<EventDetails | null>(routeData);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    quantity: '1',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCheckout = () => {
    if (!validateEmail(formData?.email)) {
      Alert.alert(TextConstants.INVALID_EMAIL);
      return;
    }
    if (formData?.name?.trim()?.length <= 0) {
      Alert.alert(TextConstants.NAME_REQUIRED);
      return;
    }
    if (formData?.quantity?.trim()?.length <= 0) {
      Alert.alert(TextConstants.QUANTITY_REQUIRED);
      return;
    }
    try {
      setSubmitting(true);
      setTimeout(() => {
        setSubmitting(false);
        navigation.replace('CheckoutSuccess', { reference: '123456' });
      }, 5000);
    } catch (err) {
      setSubmitting(false);
      //checkout failure can be handled here
    }
  };

  const calculateTotal = () => {
    if (!eventDetails) return 0;
    const quantity = parseInt(formData?.quantity) || 1;
    return eventDetails.price * quantity;
  };

  return (
    <AppRootWrapper
      enableScroll={true}
      Header={() => (
        <SecondaryHeader
          centerTitle={TextConstants.CHECKOUT}
          onBackPress={() => navigation.goBack()}
          isTitleToTheLeft
        />
      )}
    >
      <View style={styles.scrollContainer}>
        <View style={styles.eventSummary}>
          <CustomText style={styles.eventTitle}>
            {eventDetails?.title}
          </CustomText>
          <CustomText style={styles.eventDate}>
            {eventDetails?.startsAt || ''}
          </CustomText>
          <CustomText style={styles.eventVenue}>
            {eventDetails?.venue}
          </CustomText>
        </View>

        <View style={styles.formContainer}>
          <CustomText style={styles.sectionTitle}>
            {TextConstants.BUYER_INFORMATION}
          </CustomText>

          <CustomInput
            headerText={TextConstants.FULL_NAME}
            placeholder={TextConstants.FULL_NAME}
            value={formData.name}
            onChangeText={value => handleInputChange('name', value)}
          />
          <CustomInput
            headerText={TextConstants.EMAIL_ADDRESS}
            placeholder={TextConstants.EMAIL_ADDRESS}
            value={formData.email}
            onChangeText={value => handleInputChange('email', value)}
            keyboardType="email-address"
            wrapperStyle={{ marginVertical: 20 }}
          />
          <CustomInput
            headerText={TextConstants.QUANTITY_1_10}
            placeholder={TextConstants.QUANTITY_1_10}
            value={formData.quantity}
            onChangeText={value => {
              if (
                validateNumbers(value) &&
                Number(value) < 11 &&
                !value?.includes('.')
              )
                handleInputChange('quantity', value);
            }}
            keyboardType="numeric"
          />
        </View>

        {formData?.quantity && (
          <View style={styles.priceSummary}>
            <CustomText style={styles.sectionTitle}>
              {TextConstants.PRICE_SUMMARY}
            </CustomText>

            <View style={styles.priceRow}>
              <CustomText style={styles.priceLabel}>
                {formData?.quantity} × {eventDetails?.price || 0}
              </CustomText>
              <CustomText style={styles.priceValue}>
                ₦{calculateTotal()}
              </CustomText>
            </View>

            <View style={styles.totalRow}>
              <CustomText style={styles.totalLabel}>
                {TextConstants.TOTAL}
              </CustomText>
              <CustomText style={styles.totalValue}>
                ₦{calculateTotal()}
              </CustomText>
            </View>
          </View>
        )}
      </View>
      <CustomButton
        label={TextConstants.COMPLETE_PURCHASE}
        onPress={handleCheckout}
        loading={submitting}
        style={styles.checkoutButton}
      />
    </AppRootWrapper>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    width: '100%',
  },
  eventSummary: {
    backgroundColor: Colors.white,
    padding: horizontalScale(20),
    marginBottom: verticalScale(16),
  },
  eventTitle: {
    fontSize: scaleFont(20),
    fontWeight: '700',
    color: Colors.onBackground,
    marginBottom: verticalScale(8),
    lineHeight: moderateScale(28),
  },
  eventDate: {
    fontSize: scaleFont(16),
    color: Colors.onSurface,
    marginBottom: verticalScale(4),
  },
  eventVenue: {
    fontSize: scaleFont(14),
    color: Colors.onSurfaceVariant,
  },
  formContainer: {
    backgroundColor: Colors.white,
    padding: horizontalScale(5),
    marginBottom: verticalScale(16),
  },
  sectionTitle: {
    fontSize: scaleFont(18),
    fontWeight: '600',
    color: Colors.onBackground,
    marginBottom: verticalScale(16),
  },
  priceSummary: {
    backgroundColor: Colors.white,
    padding: horizontalScale(20),
    marginBottom: verticalScale(16),
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(8),
  },
  priceLabel: {
    fontSize: scaleFont(16),
    color: Colors.onSurface,
  },
  priceValue: {
    fontSize: scaleFont(16),
    fontWeight: '600',
    color: Colors.onSurface,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: verticalScale(12),
    borderTopWidth: 1,
    borderTopColor: Colors.outline,
  },
  totalLabel: {
    fontSize: scaleFont(18),
    fontWeight: '700',
    color: Colors.onBackground,
  },
  totalValue: {
    fontSize: scaleFont(18),
    fontWeight: '700',
    color: Colors.primaryBlue,
  },
  checkoutButton: {
    backgroundColor: Colors.primaryBlue,
  },
});

export default Checkout;
