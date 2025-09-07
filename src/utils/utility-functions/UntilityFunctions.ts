import { Dimensions } from 'react-native';
import { Colors } from '../theme/colors/Colors';
import { EventCategory } from '../../types';

const dimensions = Dimensions.get('window');
export const height = dimensions.height;
export const width = dimensions.width;
export const bottomTabBottomPadding = 105;

export const capitalize = (word: string | undefined) => {
  if (word == undefined || word == null) return '';
  return word?.charAt(0).toUpperCase() + word?.slice(1);
};

export const minHeightForScrollFlex = 810;

export const getCategoryColor = (category: EventCategory): string => {
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

export const formatPrice = (price: number): string => {
  return `₦${price.toLocaleString()}`;
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

export const formatTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};

// Validation of email
export const validateEmail = (email: string): boolean => {
  if (email?.trim()?.length > 0) {
    if (/^\w+([\.+-]?\w+)*@\w+([\.+-]?\w+)*(\.\w{2,3})+$/.test(email.trim())) {
      return true;
    } else return false;
  } else return false;
};

// validate number-only
export const validateNumbers = (value: string) => {
  if (Number.isNaN(Number(value))) {
    return false;
  } else {
    return true;
  }
};
export const reportError = (error: any) => {};
