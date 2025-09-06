import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Checkout from '../../screens/checkout/Checkout';
import CheckoutSuccess from '../../screens/checkout/CheckoutSuccess';
import CheckoutFailure from '../../screens/checkout/CheckoutFailure';

const Stack = createNativeStackNavigator();

const CheckoutStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Checkout" component={Checkout} />
      <Stack.Screen name="CheckoutSuccess" component={CheckoutSuccess} />
      <Stack.Screen name="CheckoutFailure" component={CheckoutFailure} />
    </Stack.Navigator>
  );
};

export default CheckoutStack;
