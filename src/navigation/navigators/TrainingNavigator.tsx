import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect } from 'react';

import SessionRecap from '@/screens/Training/SessionRecap';
import TrainingStepper from '@/screens/Training/TrainingStepper';
import { RootStackScreenProps } from '@/types';
import { UID_V4 } from '@/types/Exercices.types';

export type TrainingTabParamList = {
  SessionRecap: { programId: UID_V4; sessionId: UID_V4 };
  TrainingStepper: { trainingId: UID_V4 };
};

export type TrainingScreenProps<Screen extends keyof TrainingTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<TrainingTabParamList, Screen>,
  NativeStackScreenProps<TrainingTabParamList>
>;

const Stack = createNativeStackNavigator<TrainingTabParamList>();

export default function TrainingNavigator({
  navigation: RootNav
}: RootStackScreenProps<'Training'>) {
  useEffect(() => {
    RootNav.setOptions({
      title: 'training.sessionName'
    });
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="SessionRecap" component={SessionRecap} />
      <Stack.Screen name="TrainingStepper" component={TrainingStepper} />
    </Stack.Navigator>
  );
}
