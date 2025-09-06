import { Dimensions } from 'react-native';

const dimensions = Dimensions.get('window');
export const height = dimensions.height;
export const width = dimensions.width;
export const bottomTabBottomPadding = 105;

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

export const capitalize = (word: string | undefined) => {
  if (word == undefined || word == null) return '';
  return word?.charAt(0).toUpperCase() + word?.slice(1);
};

//check if a string contains a number(s)
export const containsNumbers = (str: string) => {
  return /\d/.test(str);
};

//check if a string contains a special character
export const containsSpecialCharacter = (str: string) => {
  return /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(str);
};

//check if a string contains a Upper case letter
export const isUppercaseIncluded = (str: string) => {
  return /[A-Z]/.test(str);
};

//check if a string contains a lower case letter
export const isLowercaseIncluded = (str: string) => {
  return /[a-z]/.test(str);
};

export const minHeightForScrollFlex = 810;

export const formatDecimalAmount = (
  amount: string | number | undefined,
  digits = 2,
  canReturnNull = false,
) => {
  if (amount == null || amount == undefined || amount == '')
    return canReturnNull ? null : digits == 2 ? '0.00' : '0.0000';

  if (Number(amount) < 999) return String(amount);

  const _amount = Number(Number(amount)?.toFixed(digits));
  var formatter = new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: digits,
  });

  return formatter.format(_amount);
};

export const reportError = (error: any) => {};
