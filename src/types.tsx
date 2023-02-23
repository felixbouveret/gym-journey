/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabNavigationProp, BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import {
  CompositeNavigationProp,
  CompositeScreenProps,
  NavigatorScreenParams
} from '@react-navigation/native';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';

import { UID_V4 } from './store/Programs';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Modal: undefined;
  ExerciceModal: undefined;
  Training: undefined;
  NotFound: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type RootTabParamList = {
  ProgramsScreen: undefined;
  History: undefined;
  Exercices: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;

export type ProgramsTabParamList = {
  Programs: undefined;
  ProgramsCreation: { id: UID_V4; editing?: boolean };
  ProgramsSession: { programId: UID_V4; sessionId: UID_V4; editing?: boolean };
  ProgramsExerciceModal: { programId: UID_V4; sessionId: UID_V4; exerciceName?: string };
};

export type ProgramsTabScreenProps<Screen extends keyof ProgramsTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<ProgramsTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;

export type navigationProgramsProps = CompositeNavigationProp<
  BottomTabNavigationProp<ProgramsTabParamList, 'Programs'>,
  NativeStackNavigationProp<RootStackParamList>
>;

export type ExercicesTabParamList = {
  ExercicesList: undefined;
  ExerciceSingle: undefined;
  ExerciceModal: undefined;
};

export type ExercicesTabScreenProps<Screen extends keyof ExercicesTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<ExercicesTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;

export type navigationExercicesProps = CompositeNavigationProp<
  BottomTabNavigationProp<ExercicesTabParamList, 'ExercicesList'>,
  NativeStackNavigationProp<RootStackParamList>
>;
