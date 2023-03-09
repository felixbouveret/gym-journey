import { BottomTabScreenProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
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

export type SessionRecapScreenProps<Screen extends keyof TrainingTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<TrainingTabParamList, Screen>,
    NativeStackScreenProps<TrainingTabParamList>
  >;

const BottomTab = createBottomTabNavigator<TrainingTabParamList>();

export default function TrainingScreen({ navigation }: RootStackScreenProps<'Training'>) {
  const { training } = useSelector((state: RootState) => state.training) as { training: Training };

  useEffect(() => {
    navigation.setOptions({
      title: training.sessionName
    });
  }, []);

  useEffect(() => {
    if (training.state === TrainingStateEnum.IN_PROGRESS)
      navigation.setOptions({ gestureEnabled: false });
  }, [training]);

  return (
    <BottomTab.Navigator
      tabBar={() => null}
      screenOptions={{
        headerShown: false
      }}
    >
      <BottomTab.Screen name="SessionRecap" component={SessionRecap} />
      <BottomTab.Screen name="TrainingStepper" component={TrainingStepper} />
    </BottomTab.Navigator>
  );
}
