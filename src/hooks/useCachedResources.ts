import { FontAwesome } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { debounce } from 'lodash';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '@/store';
import { setState as setExercicesState } from '@/store/Exercices';
import { setPrograms } from '@/store/Programs';
import { setSessions } from '@/store/Sessions';
import { setState as setTrainingsState, Training } from '@/store/Training';
import { Exercice } from '@/types/Exercices.types';
import { ProgramSession, ProgramSimplified } from '@/types/Programs.types';

import useStorage, { StoragePath } from './useStorage';

export default function useCachedResources() {
  const dispatch = useDispatch();
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  const { getStorageData, setStorageData } = useStorage();

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();
        const [storagePrograms, storageExercices, storageTrainings, storedSessions] =
          await Promise.all([
            getStorageData<ProgramSimplified[]>(StoragePath.PROGRAMS),
            getStorageData<Exercice[]>(StoragePath.EXERCICES_OLD),
            getStorageData<Training[]>(StoragePath.TRAININGS_OLD),
            getStorageData<ProgramSession[]>(StoragePath.SESSIONS)
          ]);

        if (storagePrograms) dispatch(setPrograms(storagePrograms));
        if (storagePrograms) dispatch(setPrograms(storagePrograms));
        if (storageExercices) dispatch(setExercicesState(storageExercices));
        if (storageTrainings) dispatch(setTrainingsState(storageTrainings));
        if (storedSessions) dispatch(setSessions(storedSessions));
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

  const {
    exercices: { exercices },
    programs: { programsList },
    trainings: { trainings },
    sessions: { sessionsList }
  } = useSelector((state: RootState) => state);

  const debouncedSaveTraining = debounce(() => setStorageData('trainings', trainings), 1000);
  useEffect(() => {
    debouncedSaveTraining();
  }, [trainings]);

  useEffect(() => {
    setStorageData('exercices', exercices);
  }, [exercices]);

  useEffect(() => {
    setStorageData(StoragePath.PROGRAMS, programsList);
  }, [programsList]);

  useEffect(() => {
    setStorageData(StoragePath.SESSIONS, sessionsList);
  }, [sessionsList]);

  return isLoadingComplete;
}
