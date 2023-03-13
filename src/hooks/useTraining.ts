import { Alert } from 'react-native';
import uuid from 'react-native-uuid';
import { useDispatch } from 'react-redux';

import { ProgramSession } from '@/store/Programs';
import {
  finishTraining,
  ITrainingSet,
  ITrainingStep,
  startTraining,
  Training,
  TrainingExercice,
  TrainingStateEnum,
  updateTrainingStep
} from '@/store/Training';
import { UID_V4 } from '@/types/Exercices.types';

export default function useTraining() {
  const dispatch = useDispatch();

  const getTrainingSteps = (session: ProgramSession): ITrainingStep[] => {
    return session.steps.map((s) => {
      const sets: ITrainingSet[] = [];

      for (let i = 0; i < Number(s.setNumber); i++) {
        sets.push({
          id: uuid.v4(),
          exercices: s.exercices.map<TrainingExercice>(({ exerciceId, weight, reps }) => ({
            id: uuid.v4(),
            exerciceId,
            weight,
            reps,
            lifts: [
              {
                weight,
                reps
              },
              undefined
            ]
          }))
        });
      }

      return {
        id: uuid.v4(),
        exercices: s.exercices.map((e) => e.exerciceId),
        type: s.type,
        restTime: s.restTime,
        sets
      };
    });
  };

  const initTraining = (programId: UID_V4, session: ProgramSession) => {
    const id = uuid.v4();
    const sessionId = session.id;
    const sessionName = session.name;
    const startedAt = new Date().toISOString();
    const state = TrainingStateEnum.NOT_STARTED;
    const steps = getTrainingSteps(session);

    return { id, programId, sessionId, sessionName, startedAt, state, steps };
  };

  const onTrainingStepUpdate = (trainingId: UID_V4, stepId: UID_V4, step: ITrainingStep) => {
    dispatch(updateTrainingStep(trainingId, stepId, step));
  };

  const onTrainingStart = (training: Training) => {
    dispatch(startTraining(training));
  };

  const onTrainingFinished = (trainingId: UID_V4) => {
    Alert.alert('Terminer la séance', '', [
      {
        text: 'Non annuler',
        style: 'cancel'
      },
      {
        text: 'Oui terminer',
        onPress: () => finishTraining(trainingId)
      }
    ]);
  };

  return {
    initTraining,
    onTrainingStart,
    onTrainingStepUpdate,
    onTrainingFinished
  };
}
