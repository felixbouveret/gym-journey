import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Alert } from 'react-native';
import { useDispatch } from 'react-redux';

import { createProgram, deleteProgram, renameProgram } from '@/store/Programs';
import { ProgramsTabParamList, RootStackParamList } from '@/types';

export default function usePrograms() {
  const dispatch = useDispatch();

  const onCreateProgram = (
    navigation: CompositeNavigationProp<
      BottomTabNavigationProp<ProgramsTabParamList, 'Programs'>,
      NativeStackNavigationProp<RootStackParamList>
    >
  ) => {
    Alert.prompt('Nouveau programme', 'Nom du programme', [
      {
        text: 'Annuler',
        style: 'cancel'
      },
      {
        text: 'Créer',
        onPress: (name) => {
          const programName = name ? name.trim() : 'Programme sans nom';
          dispatch(createProgram(programName));
          navigation.navigate('ProgramsCreation', { name: programName });
        }
      }
    ]);
  };

  const onDeleteProgram = async (name: string) => {
    Alert.alert(
      'Supprimer ?',
      'Êtes vous sûr de vouloir supprimer ce programme ainsi que toutes les séances associées?',
      [
        {
          text: 'Non annuler',
          style: 'cancel'
        },
        {
          text: 'Oui supprimer',
          style: 'destructive',
          onPress: () => dispatch(deleteProgram(name))
        }
      ]
    );
  };
  const onUpdateProgram = async (name: string) => {
    Alert.prompt('Renommer le programme', 'Nom du programme', [
      {
        text: 'Annuler',
        style: 'cancel'
      },
      {
        text: 'Renommer',
        onPress: (newName) => {
          if (newName) dispatch(renameProgram(name, newName.trim()));
        }
      }
    ]);
  };

  return {
    onCreateProgram,
    onDeleteProgram,
    onUpdateProgram
  };
}
