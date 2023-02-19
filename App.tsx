import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider } from 'native-base';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';

import useCachedResources from '@/hooks/useCachedResources';
import Navigation from '@/navigation';

import store from './src/store';

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Provider store={store}>
        <NativeBaseProvider>
          <BottomSheetModalProvider>
            <SafeAreaProvider>
              <Navigation />
              <StatusBar />
            </SafeAreaProvider>
          </BottomSheetModalProvider>
        </NativeBaseProvider>
      </Provider>
    );
  }
}
