import React, { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import MainApp from './src/navigation/root-navigation/MainApp';
import { StatusBar, View, ActivityIndicator } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './src/redux-toolkit/store';
import databaseInit from './src/services/databaseInit';
import { Colors } from './src/utils/theme/colors/Colors';

function App() {
  const [isDatabaseReady, setIsDatabaseReady] = useState(false);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        await databaseInit.initializeDatabase();
        setIsDatabaseReady(true);
      } catch (error) {
        console.error('Failed to initialize app:', error);
        // Still show the app even if database initialization fails
        setIsDatabaseReady(true);
      }
    };

    initializeApp();
  }, []);

  if (!isDatabaseReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.background }}>
        <ActivityIndicator size="large" color={Colors.primaryBlue} />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <NavigationContainer>
          <StatusBar barStyle="dark-content" />
          <MainApp />
        </NavigationContainer>
      </Provider>
    </SafeAreaProvider>
  );
}

export default App;
