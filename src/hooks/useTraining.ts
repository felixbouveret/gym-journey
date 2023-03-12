import uuid from 'react-native-uuid';
import { useDispatch } from 'react-redux';

import { ProgramSession } from '@/store/Programs';
import {
  initTraining,
  ITrainingSet,
  ITrainingStep,
  startTraining,
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

  const onTrainingInit = async (programId: UID_V4, session: ProgramSession) => {
    const id = uuid.v4();
    const sessionId = session.id;
    const sessionName = session.name;
    const startedAt = null;
    const state = TrainingStateEnum.NOT_STARTED;
    const steps = getTrainingSteps(session);

    dispatch(initTraining({ id, programId, sessionId, sessionName, startedAt, state, steps }));
  };

  const onTrainingStepUpdate = async (stepId: UID_V4, step: ITrainingStep) => {
    dispatch(updateTrainingStep(stepId, step));
  };

  const onTrainingStart = async () => {
    dispatch(startTraining());
  };

  return {
    onTrainingInit,
    onTrainingStart,
    onTrainingStepUpdate
  };
}
