import { FontAwesome } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '@/store';
import { setState as setExercicesState } from '@/store/Exercices';
import { setState as setProgramsState } from '@/store/Programs';

import useStorage from './useStorage';

export default function useCachedResources() {
  const dispatch = useDispatch();
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  const { getStorageData, setStorageData } = useStorage();

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();
        const [storagePrograms, storageExercices] = await Promise.all([
          getStorageData('programs'),
          getStorageData('exercices')
        ]);

        if (storagePrograms) dispatch(setProgramsState(storagePrograms));
        if (storageExercices) dispatch(setExercicesState(storageExercices));
        // Load fonts
        await Font.loadAsync({
          ...FontAwesome.font,
          'space-mono': require('@/assets/fonts/SpaceMono-Regular.ttf')
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  const { programs } = useSelector((state: RootState) => state.programs);

  useEffect(() => {
    setStorageData('programs', programs);
  }, [programs]);

  const { exercices } = useSelector((state: RootState) => state.exercices);

  useEffect(() => {
    setStorageData('exercices', exercices);
  }, [exercices]);

  return isLoadingComplete;
}
