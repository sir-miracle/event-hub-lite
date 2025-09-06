import {Dimensions, PixelRatio, Platform} from 'react-native';

// Get screen dimensions
const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

// Base dimensions for different device types
const BASE_WIDTH = {
  phone: 385, // iPhone SE / 11 Pro width
  tablet: 768, // iPad Mini width
};

const BASE_HEIGHT = {
  phone: 815, // iPhone 11 Pro height
  tablet: 1024, // iPad Mini height
};

// Determine if device is a tablet
const isTablet = () => {
  const {width, height} = Dimensions.get('window');
  const aspectRatio = height / width;
  
  // iPad detection
  if (Platform.OS === 'ios') {
    return Platform.isPad;
  }
  
  // Android tablet detection
  if (Platform.OS === 'android') {
    return aspectRatio <= 1.6;
  }
  
  // Default tablet detection based on screen size
  return width >= 768;
};

// Get device type
const getDeviceType = () => isTablet() ? 'tablet' : 'phone';

// Get base dimensions based on device type
const getBaseDimensions = () => {
  const deviceType = getDeviceType();
  return {
    width: BASE_WIDTH[deviceType],
    height: BASE_HEIGHT[deviceType],
  };
};

// Horizontal scale (width-based)
const horizontalScale = (size: number): number => {
  const {width} = getBaseDimensions();
  const scaleFactor = SCREEN_WIDTH / width;
  
  // Apply different scaling factors for tablets
  if (isTablet()) {
    // Reduce scaling factor for tablets to prevent elements from becoming too large
    return size * Math.min(scaleFactor, 1.2);
  }
  
  return size * scaleFactor;
};

// Vertical scale (height-based)
const verticalScale = (size: number): number => {
  const {height} = getBaseDimensions();
  const scaleFactor = SCREEN_HEIGHT / height;
  
  // Apply different scaling factors for tablets
  if (isTablet()) {
    // Reduce scaling factor for tablets to prevent elements from becoming too large
    return size * Math.min(scaleFactor, 1.2);
  }
  
  return size * scaleFactor;
};

// Moderate scale (in between raw and scaled)
const moderateScale = (size: number, factor = 0.5): number => {
  // Use smaller factor for tablets to prevent excessive scaling
  const tabletFactor = isTablet() ? 0.3 : factor;
  return size + (horizontalScale(size) - size) * tabletFactor;
};

// Font scaling with pixel rounding
const scaleFont = (size: number): number => {
  // Apply different font scaling for tablets
  if (isTablet()) {
    // Cap the maximum font size for tablets
    const scaledSize = horizontalScale(size * 1.2);
    return Math.round(PixelRatio.roundToNearestPixel(Math.min(scaledSize, size * 1.2)));
  }
  
  return Math.round(PixelRatio.roundToNearestPixel(horizontalScale(size)));
};


export {
  horizontalScale,
  verticalScale,
  moderateScale,
  scaleFont,
  isTablet,
  getDeviceType,
};
