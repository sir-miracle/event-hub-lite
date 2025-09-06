import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EventDetails from '../../screens/event-details/EventDetails';
const Stack = createNativeStackNavigator();

const EventDetailsStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="EventDetails" component={EventDetails} />
    </Stack.Navigator>
  );
};

export default EventDetailsStack;
