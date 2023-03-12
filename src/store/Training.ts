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
  startedAt: string | null;
  state: TrainingStateEnum;
  steps: ITrainingStep[];
}

type SliceState = { training: Training | null };

const initialState: SliceState = { training: null };

export const roomsStore = createSlice({
  name: 'training',

  initialState,

  reducers: {
    setState: {
      reducer(state, action: PayloadAction<{ storageState: Training }>) {
        state.training = action.payload.storageState;
      },
      prepare(storageState: Training) {
        return { payload: { storageState } };
      }
    },

    initTraining: {
      reducer(state, action: PayloadAction<Training>) {
        state.training = action.payload;
      },
      prepare(training: Training) {
        return { payload: training };
      }
    },

    startTraining(state) {
      if (state.training !== null) state.training.state = TrainingStateEnum.IN_PROGRESS;
    },

    updateTrainingStep: {
      reducer(state, action: PayloadAction<{ stepId: UID_V4; step: ITrainingStep }>) {
        if (state.training !== null) {
          const { stepId, step } = action.payload;
          const stepIndex = state.training.steps.findIndex((s) => s.id === stepId);
          state.training.steps[stepIndex] = step;
        }
      },
      prepare(stepId: UID_V4, step: ITrainingStep) {
        return { payload: { stepId, step } };
      }
    }
  }
});

export const { setState, initTraining, startTraining, updateTrainingStep } = roomsStore.actions;

export default roomsStore.reducer;
