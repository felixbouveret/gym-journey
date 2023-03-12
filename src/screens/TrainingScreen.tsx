import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import SessionRecap from '@/stacks/Training/SessionRecap';
import TrainingStepper from '@/stacks/Training/TrainingStepper';
import { RootState } from '@/store';
import { Training, TrainingStateEnum } from '@/store/Training';
import { RootStackScreenProps } from '@/types';

export type TrainingTabParamList = {
  SessionRecap: undefined;
  TrainingStepper: { training: Training };
};

export type TrainingScreenProps<Screen extends keyof TrainingTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<TrainingTabParamList, Screen>,
  NativeStackScreenProps<TrainingTabParamList>
>;

const Stack = createNativeStackNavigator<TrainingTabParamList>();

export default function TrainingScreen({ navigation: RootNav }: RootStackScreenProps<'Training'>) {
  const { training } = useSelector((state: RootState) => state.training) as { training: Training };

  useEffect(() => {
    RootNav.setOptions({
      title: training.sessionName
    });
  }, []);

  useEffect(() => {
    if (training.state === TrainingStateEnum.IN_PROGRESS)
      RootNav.setOptions({ gestureEnabled: false });
  }, [training]);

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
