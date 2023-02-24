import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { StatusBar } from 'expo-status-bar';
import { extendTheme, NativeBaseProvider } from 'native-base';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';

import useCachedResources from '@/hooks/useCachedResources';
import Navigation from '@/navigation';

import store from './src/store';

function CacheCheckComponent() {
  const isLoadingComplete = useCachedResources();

  const theme = extendTheme({
    components: {
      Button: {
        baseStyle: {
          rounded: 8
        }
      },
      IconButton: {
        baseStyle: {
          rounded: 8
        }
      },
      Input: {
        baseStyle: {
          rounded: 8
        }
      }
    }
  });

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <NativeBaseProvider theme={theme}>
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
