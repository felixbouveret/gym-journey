import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider } from 'native-base';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';

import useCachedResources from '@/hooks/useCachedResources';
import Navigation from '@/navigation';

import store from './src/store';

function CacheCheckComponent() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <NativeBaseProvider>
        <BottomSheetModalProvider>
          <SafeAreaProvider>
            <Navigation />
            <StatusBar />
          </SafeAreaProvider>
        </BottomSheetModalProvider>
      </NativeBaseProvider>
    );
  }
}

export default function App() {
  return (
    <Provider store={store}>
      <CacheCheckComponent />
    </Provider>
  );
}
