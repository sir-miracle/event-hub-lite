import React, { FC } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Colors } from '../../utils/theme/colors/Colors';
import {
  scaleFont,
  moderateScale,
  horizontalScale,
  verticalScale,
} from '../../utils/scaling';
import { CustomText } from '../atoms';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onClear?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  autoFocus?: boolean;
}

const SearchBar: FC<SearchBarProps> = ({
  value,
  onChangeText,
  placeholder = 'Search events...',
  onClear,
  onFocus,
  onBlur,
}) => {
  const handleClear = () => {
    onChangeText('');
    onClear?.();
  };

  return (
    <View style={[styles.container]}>
      <View style={styles.searchIcon}>
        <CustomText style={styles.searchIconText}>🔍</CustomText>
      </View>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={Colors.onSurfaceVariant}
        onFocus={() => {
          onFocus?.();
        }}
        onBlur={() => {
          onBlur?.();
        }}
        returnKeyType="search"
        autoCorrect={false}
        autoCapitalize="none"
      />

      {value.length > 0 && (
        <TouchableOpacity
          style={styles.clearButton}
          onPress={handleClear}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <CustomText style={styles.clearIcon}>✕</CustomText>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: moderateScale(12),
    marginHorizontal: horizontalScale(16),
    marginVertical: verticalScale(8),
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(12),
    borderWidth: 1,
    borderColor: Colors.outline,
  },
  searchIcon: {
    marginRight: horizontalScale(12),
  },
  searchIconText: {
    fontSize: scaleFont(16),
    color: Colors.onSurfaceVariant,
  },
  input: {
    flex: 1,
    fontSize: scaleFont(16),
    color: Colors.onSurface,
    fontFamily: 'System',
    paddingVertical: 0,
  },
  clearButton: {
    marginLeft: horizontalScale(8),
    width: moderateScale(24),
    height: moderateScale(24),
    borderRadius: moderateScale(12),
    backgroundColor: Colors.outlineVariant,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearIcon: {
    fontSize: scaleFont(12),
    color: Colors.onSurfaceVariant,
    fontWeight: '600',
  },
});

export default SearchBar;
