import { Alert } from 'react-native';
import uuid from 'react-native-uuid';
import { useDispatch } from 'react-redux';

import {
  addSessionStep,
  archiveProgram,
  createProgram,
  createSession,
  deleteProgram,
  deleteSession,
  ProgramSessionStep,
  removeSessionStep,
  renameProgram,
  renameSession,
  restoreProgram,
  UID_V4,
  updateSessionStep,
  validateProgram
} from '@/store/Programs';

export default function usePrograms() {
  const dispatch = useDispatch();

  const onCreateProgram = (callback: (id: UID_V4) => void) => {
    Alert.prompt('Nouveau programme', 'Nom du programme', [
      {
        text: 'Annuler',
        style: 'cancel'
      },
      {
        text: 'Créer',
        onPress: (name) => {
          const programId = uuid.v4();
          const programName = name ? name.trim() : 'Programme sans nom';

          dispatch(createProgram(programName, programId));
          callback(programId);
        }
      }
    ]);
  };

  const onValidateProgram = (id: UID_V4, callback: () => void) => {
    Alert.alert('Valider', "Valider le programme pour commencer à l'utiliser", [
      {
        text: 'Annuler',
        style: 'cancel'
      },
      {
        text: 'Valider',
        onPress: () => {
          dispatch(validateProgram(id));
          callback();
        }
      }
    ]);
  };

  const onArchiveProgram = (id: UID_V4, callback?: () => void) => {
    Alert.alert('Archiver', '', [
      {
        text: 'Annuler',
        style: 'cancel'
      },
      {
        text: 'Archiver',
        onPress: () => {
          dispatch(archiveProgram(id));
          callback?.();
        }
      }
    ]);
  };

  const onRestorProgram = (id: UID_V4, callback?: () => void) => {
    Alert.alert('Restaurer', '', [
      {
        text: 'Annuler',
        style: 'cancel'
      },
      {
        text: 'Restaurer',
        onPress: () => {
          dispatch(restoreProgram(id));
          callback?.();
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

  const onCreateSession = (programId: UID_V4, callback: (id: UID_V4) => void) => {
    Alert.prompt('Nouvelle séance', 'Nom de la séance', [
      {
        text: 'Annuler',
        style: 'cancel'
      },
      {
        text: 'Créer',
        onPress: (name) => {
          const sessionId = uuid.v4();
          const sessionName = name ? name.trim() : 'Séance sans nom';
          dispatch(createSession(programId, sessionId, sessionName));
          callback(sessionId);
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
    stepId
  }: {
    programId: UID_V4;
    sessionId: UID_V4;
    stepId: UID_V4;
  }) => {
    dispatch(removeSessionStep(programId, sessionId, stepId));
  };

  return {
    onCreateProgram,
    onValidateProgram,
    onArchiveProgram,
    onDeleteProgram,
    onUpdateProgram,
    onCreateSession,
    onDeleteSession,
    onUpdateSession,
    onAddSessionStep,
    onUpdateSessionStep,
    onRemoveSessionStep,
    onRestorProgram
  };
}
