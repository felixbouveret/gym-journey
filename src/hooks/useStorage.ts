import AsyncStorage from '@react-native-async-storage/async-storage';

export enum StoragePath {
  TRAININGS_OLD = 'trainings',
  EXERCICES_OLD = 'exercices',
  PROGRAMS_OLD = 'programs',
  PROGRAMS = 'programs_list',
  SESSIONS = 'sessions_list'
}

export default function useStorage() {
  const getStorageData = async <T>(path: StoragePath): Promise<T> => {
    const data = await AsyncStorage.getItem(path);
    return data ? JSON.parse(data) : null;
  };

  const setStorageData = async (path: string, data: unknown) => {
    await AsyncStorage.setItem(path, JSON.stringify(data));
  };

  const cleanStorage = async () => {
    await AsyncStorage.clear();
  };

  return {
    getStorageData,
    setStorageData,
    cleanStorage
  };
}
