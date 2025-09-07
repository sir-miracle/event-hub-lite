import React, { FC } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { EventCategory } from '../../types';
import { Colors } from '../../utils/theme/colors/Colors';
import {
  scaleFont,
  moderateScale,
  horizontalScale,
  verticalScale,
} from '../../utils/scaling';
import CustomText from '../atoms/CustomText';

interface CategoryFilterProps {
  categories: (EventCategory | 'All')[];
  selectedCategory: EventCategory | 'All';
  onCategorySelect: (category: EventCategory | 'All') => void;
}

const CategoryFilter: FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onCategorySelect,
}) => {
  const getCategoryColor = (category: EventCategory | 'All'): string => {
    if (category === 'All') return Colors.primaryBlue;

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

  const getCategoryIcon = (category: EventCategory | 'All'): string => {
    switch (category) {
      case 'All':
        return '📋';
      case 'Tech':
        return '💻';
      case 'Business':
        return '💼';
      case 'Health':
        return '🏥';
      case 'Arts':
        return '🎨';
      case 'Education':
        return '📚';
      default:
        return '📋';
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {categories.map(category => {
          const isSelected = selectedCategory === category;
          const categoryColor = getCategoryColor(category);

          return (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                isSelected && {
                  backgroundColor: categoryColor,
                  borderColor: categoryColor,
                },
                !isSelected && {
                  borderColor: Colors.outline,
                },
              ]}
              onPress={() => onCategorySelect(category)}
              activeOpacity={0.7}
            >
              <CustomText style={styles.categoryIcon}>
                {getCategoryIcon(category)}
              </CustomText>
              <CustomText
                style={[
                  styles.categoryText,
                  isSelected && styles.selectedCategoryText,
                  !isSelected && { color: Colors.onSurfaceVariant },
                ]}
              >
                {category}
              </CustomText>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: verticalScale(8),
  },
  scrollContent: {
    paddingHorizontal: horizontalScale(16),
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(10),
    marginRight: horizontalScale(12),
    borderRadius: moderateScale(20),
    borderWidth: 1,
    backgroundColor: Colors.white,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  categoryIcon: {
    fontSize: scaleFont(16),
    marginRight: horizontalScale(6),
  },
  categoryText: {
    fontSize: scaleFont(14),
    fontWeight: '500',
    fontFamily: 'System',
  },
  selectedCategoryText: {
    color: Colors.white,
    fontWeight: '600',
  },
});

export default CategoryFilter;
