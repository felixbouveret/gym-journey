import { Alert } from 'react-native';
import uuid from 'react-native-uuid';
import { useDispatch } from 'react-redux';

import { ProgramSession } from '@/store/Programs';
import {
  finishTraining,
  ITrainingLift,
  ITrainingSet,
  ITrainingStep,
  saveTraining,
  startTraining,
  Training,
  TrainingExercice,
  TrainingStateEnum,
  updateTrainingLift,
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
            lift: {
              weight,
              reps
            }
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

  const onTrainingStepUpdate = (stepId: UID_V4, step: ITrainingStep) => {
    dispatch(updateTrainingStep(stepId, step));
    dispatch(saveTraining());
  };

  const onTrainingLiftUpdate = (
    stepId: UID_V4,
    setId: UID_V4,
    eIndex: number,
    lift: ITrainingLift
  ) => {
    dispatch(updateTrainingLift(stepId, setId, eIndex, lift));
    dispatch(saveTraining());
  };

  const onTrainingStart = (training: Training) => {
    dispatch(startTraining(training));
    dispatch(saveTraining());
  };

  const onTrainingFinished = (trainingId: UID_V4, callback: () => void) => {
    Alert.alert('Terminer la séance', '', [
      {
        text: 'Non annuler',
        style: 'cancel'
      },
      {
        text: 'Oui terminer',
        onPress: () => {
          dispatch(finishTraining(trainingId));
          callback();
        }
      }
    ]);
  };

  const addSet = (step: ITrainingStep) => {
    const sets = step.sets;
    const lastSet = sets[sets.length - 1];
    const newSet = {
      id: uuid.v4(),
      exercices: lastSet.exercices.map((e) => ({
        ...e,
        id: uuid.v4(),
        lift: {
          weight: '',
          reps: ''
        }
      }))
    };

    const newStep = { ...step, sets: [...sets, newSet] };

    onTrainingStepUpdate(step.id, newStep);
  };

  const removeSet = (step: ITrainingStep, setId: UID_V4) => {
    const newStep = { ...step, sets: step.sets.filter((s) => s.id !== setId) };

    onTrainingStepUpdate(step.id, newStep);
  };

  return {
    initTraining,
    onTrainingStart,
    onTrainingStepUpdate,
    onTrainingFinished,
    onTrainingLiftUpdate,
    addSet,
    removeSet
  };
}
