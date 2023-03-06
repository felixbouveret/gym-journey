import uuid from 'react-native-uuid';
import { useDispatch } from 'react-redux';

import { ProgramSession } from '@/store/Programs';
import {
  initTraining,
  TrainingExercice,
  TrainingSet,
  TrainingStateEnum,
  TrainingStep
} from '@/store/Training';
import { UID_V4 } from '@/types/Exercices.types';

export default function useTraining() {
  const dispatch = useDispatch();

  const getTrainingSteps = (session: ProgramSession): TrainingStep[] => {
    return session.steps.map((e) => {
      const sets: TrainingSet[] = [];

      for (let i = 0; i <= Number(e.setNumber); i++) {
        sets.push({
          exercices: e.exercices.map<TrainingExercice>(({ exerciceId, weight, reps }) => ({
            id: uuid.v4(),
            exerciceId,
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
        sessionStep: e,
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

  const onTrainingStart = async () => {
    dispatch(initTraining());
  };

  return {
    onTrainingInit,
    onTrainingStart
  };
}
