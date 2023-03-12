import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ExerciceType } from '@/types/Exercices.types';

import { UID_V4 } from './Programs';

export enum TrainingStateEnum {
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  FINISHED = 'FINISHED'
}

export type ITrainingLifts = {
  weight: string;
  reps: string;
};
export interface TrainingExercice {
  exerciceId: UID_V4;
  weight: string;
  reps: string;
  lifts: [ITrainingLifts, ITrainingLifts | undefined];
}
export interface ITrainingSet {
  id: UID_V4;
  exercices: TrainingExercice[];
}

export interface ITrainingStep {
  id: UID_V4;
  restTime: string;
  type: ExerciceType;
  exercices: UID_V4[];
  sets: ITrainingSet[];
}

export interface Training {
  id: UID_V4;
  programId: UID_V4;
  sessionId: UID_V4;
  sessionName: string;
  startedAt: string;
  state: TrainingStateEnum;
  steps: ITrainingStep[];
}

type SliceState = { trainings: Training[] };

const initialState: SliceState = { trainings: [] };

export const roomsStore = createSlice({
  name: 'trainings',

  initialState,

  reducers: {
    setState: {
      reducer(state, action: PayloadAction<{ storageState: Training[] }>) {
        state.trainings = action.payload.storageState;
      },
      prepare(storageState: Training[]) {
        return { payload: { storageState } };
      }
    },

    startTraining: {
      reducer(state, action: PayloadAction<Training>) {
        if (!action.payload) return;
        const newTraining = { ...action.payload, state: TrainingStateEnum.IN_PROGRESS };
        state.trainings.push(newTraining);
      },
      prepare(training: Training) {
        return { payload: training };
      }
    },

    updateTrainingStep: {
      reducer(
        state,
        action: PayloadAction<{ trainingId: UID_V4; stepId: UID_V4; step: ITrainingStep }>
      ) {
        const training = state.trainings.find((t) => t.id === action.payload.trainingId);
        if (training) {
          const { stepId, step } = action.payload;
          const stepIndex = training.steps.findIndex((s) => s.id === stepId);
          training.steps[stepIndex] = step;
        }
      },
      prepare(trainingId: UID_V4, stepId: UID_V4, step: ITrainingStep) {
        return { payload: { trainingId, stepId, step } };
      }
    }
  }
});

export const { setState, startTraining, updateTrainingStep } = roomsStore.actions;

export default roomsStore.reducer;
