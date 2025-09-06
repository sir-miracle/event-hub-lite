import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import MainApp from './src/navigation/root-navigation/MainApp';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './src/redux-toolkit/store';

function App() {
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
