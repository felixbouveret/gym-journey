import { Alert } from 'react-native';
import { useDispatch } from 'react-redux';

import {
  addSessionStep,
  createSession,
  deleteSession,
  ProgramSessionStep,
  removeSessionStep,
  renameSession,
  UID_V4,
  updateSessionStep
} from '@/store/Programs';

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

  const onAddSessionStep = async ({
    programId,
    sessionId,
    step
  }: {
    programId: UID_V4;
    sessionId: UID_V4;
    step: ProgramSessionStep;
  }) => {
    dispatch(addSessionStep(programId, sessionId, step));
  };

  const onUpdateSessionStep = ({
    programId,
    sessionId,
    stepName,
    step
  }: {
    programId: UID_V4;
    sessionId: UID_V4;
    stepName: string;
    step: ProgramSessionStep;
  }) => {
    dispatch(updateSessionStep(programId, sessionId, stepName, step));
  };

  const onRemoveSessionStep = ({
    programId,
    sessionId,
    stepName
  }: {
    programId: UID_V4;
    sessionId: UID_V4;
    stepName: string;
  }) => {
    dispatch(removeSessionStep(programId, sessionId, stepName));
  };

  return {
    onCreateSession,
    onDeleteSession,
    onUpdateSession,
    onAddSessionStep,
    onUpdateSessionStep,
    onRemoveSessionStep
  };
}
