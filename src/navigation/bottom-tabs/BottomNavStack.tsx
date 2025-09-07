import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabParamList } from '../../types';
import Dashboard from '../../screens/dashboard/Dashboard';
import Favorites from '../../screens/favorites/Favorites';
import { Colors } from '../../utils/theme/colors/Colors';
import { scaleFont } from '../../utils/scaling';
import CustomText from '../../components/atoms/CustomText';
import { Platform, StyleSheet } from 'react-native';
import { FontsCatalogue } from '../../assets/fontsCatalogue';

const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomNavStack = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBarStyle,
        tabBarActiveTintColor: Colors.primaryBlue,
        tabBarInactiveTintColor: Colors.onSurfaceVariant,
        tabBarLabelStyle: styles.tabBarLabelStyle,
        tabBarItemStyle: { marginBottom: 10 },
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarLabel: 'Events',
          tabBarIcon: ({ color }) => (
            <CustomText
              style={{ fontSize: scaleFont(20), color, lineHeight: 26 }}
            >
              📅
            </CustomText>
          ),
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={Favorites}
        options={{
          tabBarLabel: 'Favorites',
          tabBarIcon: ({ color }) => (
            <CustomText
              style={{ fontSize: scaleFont(20), color, lineHeight: 26 }}
            >
              ❤️
            </CustomText>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavStack;

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: Colors.white,
    borderTopColor: Colors.outline,
    borderTopWidth: 1,
    paddingBottom: 8,
    paddingTop: 8,
    height: Platform.OS === 'android' ? 90 : 85,
  },
  tabBarLabelStyle: {
    fontSize: scaleFont(14),
    fontWeight: '500',
    marginTop: 2,
    fontFamily: FontsCatalogue.mazzardSemiBold,
  },
});
