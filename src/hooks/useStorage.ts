import AsyncStorage from '@react-native-async-storage/async-storage';

export default function useStorage() {
  const getStorageData = async (path: string) => {
    const data = await AsyncStorage.getItem(path);
    return data ? JSON.parse(data) : null;
  };

  const setStorageData = async (path: string, data: unknown) => {
    AsyncStorage.setItem(path, JSON.stringify(data));
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
