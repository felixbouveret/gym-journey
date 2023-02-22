import { Alert } from 'react-native';
import { useDispatch } from 'react-redux';

import { createProgram, deleteProgram, renameProgram, UID_V4 } from '@/store/Programs';

export default function usePrograms() {
  const dispatch = useDispatch();

  const onCreateProgram = () => {
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
        }
      }
    ]);
  };

  const onDeleteProgram = async (id: UID_V4) => {
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
          onPress: () => dispatch(deleteProgram(id))
        }
      ]
    );
  };
  const onUpdateProgram = async (id: UID_V4) => {
    Alert.prompt('Renommer le programme', 'Nom du programme', [
      {
        text: 'Annuler',
        style: 'cancel'
      },
      {
        text: 'Renommer',
        onPress: (newName) => {
          if (newName) dispatch(renameProgram(id, newName.trim()));
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
