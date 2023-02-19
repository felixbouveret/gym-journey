import { Alert } from 'react-native';
import { useDispatch } from 'react-redux';

import { createSession, deleteSession, renameSession, UID_V4 } from '@/store/Programs';

export default function useSessions() {
  const dispatch = useDispatch();

  const onCreateSession = (programId: UID_V4) => {
    Alert.prompt('Nouvelle séance', 'Nom de la séance', [
      {
        text: 'Annuler',
        style: 'cancel'
      },
      {
        text: 'Créer',
        onPress: (name) => {
          const sessionName = name ? name.trim() : 'Séance sans nom';
          dispatch(createSession(programId, sessionName));
        }
      }
    ]);
  };

  const onDeleteSession = async (programId: UID_V4, id: UID_V4) => {
    Alert.alert('Supprimer ?', 'Êtes vous sûr de vouloir supprimer cette séance ?', [
      {
        text: 'Non annuler',
        style: 'cancel'
      },
      {
        text: 'Oui supprimer',
        style: 'destructive',
        onPress: () => dispatch(deleteSession(programId, id))
      }
    ]);
  };

  const onUpdateSession = async (programId: UID_V4, id: UID_V4) => {
    Alert.prompt('Renommer le programme', 'Nom du programme', [
      {
        text: 'Annuler',
        style: 'cancel'
      },
      {
        text: 'Renommer',
        onPress: (newName) => {
          if (newName) dispatch(renameSession(programId, id, newName.trim()));
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
