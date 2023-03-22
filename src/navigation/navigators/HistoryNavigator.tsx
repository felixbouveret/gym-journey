import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';

import HistoryList from '@/screens/History/HistoryList';
import HistorySingle from '@/screens/History/HistorySingle';
import { RootTabScreenProps } from '@/types';
import { UID_V4 } from '@/types/Exercices.types';

export type HistoryTabParamList = {
  HistoryList: undefined;
  HistorySingle: { id: UID_V4 };
};

export type HistoryScreenProps<Screen extends keyof HistoryTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<HistoryTabParamList, Screen>,
  NativeStackScreenProps<HistoryTabParamList>
>;

const Stack = createNativeStackNavigator<HistoryTabParamList>();

export default function HistoryNavigator({}: RootTabScreenProps<'History'>) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HistoryList" component={HistoryList} />
      <Stack.Screen name="HistorySingle" component={HistorySingle} />
    </Stack.Navigator>
  );
}
