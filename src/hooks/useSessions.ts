import { Alert } from 'react-native';
import { useDispatch } from 'react-redux';

import { createProgram, deleteProgram, renameProgram } from '@/store/Programs';

export default function useSessions() {
  const dispatch = useDispatch();

  const onCreateSession = () => {
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

  const onDeleteSession = async (id: string) => {
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
  const onUpdateSession = async (id: string) => {
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
    onCreateSession,
    onDeleteSession,
    onUpdateSession
  };
}
