import {
  BottomTabBarProps,
  BottomTabScreenProps,
  createBottomTabNavigator
} from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, HStack } from 'native-base';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import SessionRecap from '@/stacks/Training/SessionRecap';
import { RootState } from '@/store';
import { Training } from '@/store/Training';
import { RootStackScreenProps } from '@/types';

export type TrainingTabParamList = {
  SessionRecap: undefined;
};

export type SessionRecapScreenProps<Screen extends keyof TrainingTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<TrainingTabParamList, Screen>,
    NativeStackScreenProps<TrainingTabParamList>
  >;

function TabBar(props: BottomTabBarProps) {
  return (
    <HStack p="4" pb={8} pt={2} backgroundColor="white">
      <Button w="full">Démarrer la séance</Button>
    </HStack>
  );
}

const BottomTab = createBottomTabNavigator<TrainingTabParamList>();

export default function TrainingScreen({ navigation }: RootStackScreenProps<'Training'>) {
  const { training } = useSelector((state: RootState) => state.training) as { training: Training };

  useEffect(() => {
    navigation.setOptions({
      title: training.sessionName
    });
  }, []);

  return (
    <BottomTab.Navigator
      tabBar={TabBar}
      screenOptions={{
        headerShown: false
      }}
    >
      <BottomTab.Screen name="SessionRecap" component={SessionRecap} />
    </BottomTab.Navigator>
  );
}
