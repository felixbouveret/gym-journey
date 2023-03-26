/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { ExercicesTabParamList } from './navigation/navigators/ExercicesNavigator';
import { HistoryTabParamList } from './navigation/navigators/HistoryNavigator';
import { ProgramsTabParamList } from './navigation/navigators/ProgramsNavigator';
import { TrainingTabParamList } from './navigation/navigators/TrainingNavigator';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Modal: undefined;
  ExerciceModal: undefined;
  Training: NavigatorScreenParams<TrainingTabParamList> | undefined;
  NotFound: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type RootTabParamList = {
  ProgramsScreen: NavigatorScreenParams<ProgramsTabParamList> | undefined;
  History: NavigatorScreenParams<HistoryTabParamList> | undefined;
  Exercices: NavigatorScreenParams<ExercicesTabParamList> | undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;
