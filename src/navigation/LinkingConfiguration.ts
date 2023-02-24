/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { RootStackParamList } from '@/types';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.createURL('/')],
  config: {
    screens: {
      Root: {
        screens: {
          ProgramsScreen: {
            screens: {
              Programs: 'list',
              ProgramsCreation: 'creation',
              ProgramsSession: 'session',
              ProgramsExerciceModal: 'exercice'
            }
          },
          History: {
            screens: {
              HistoryScreen: 'two'
            }
          }
        }
      },
      Modal: 'modal',
      ExerciceModal: 'exercice_modal',
      NotFound: '*'
    }
  }
};

export default linking;
