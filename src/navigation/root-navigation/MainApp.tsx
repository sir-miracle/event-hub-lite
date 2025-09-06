import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomNavStack from '../bottom-tabs/BottomNavStack';
import CheckoutStack from '../checkout/CheckoutStack';
import EventDetailsStack from '../event-details/EventDetailsStack';

const Stack = createNativeStackNavigator();

const MainApp = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BottomNavStack" component={BottomNavStack} />
      <Stack.Screen name="CheckoutStack" component={CheckoutStack} />
      <Stack.Screen name="EventDetailsStack" component={EventDetailsStack} />
    </Stack.Navigator>
  );
};

export default MainApp;
