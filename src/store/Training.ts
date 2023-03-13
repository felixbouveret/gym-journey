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

type SliceState = {
  trainings: Training[];
  activeTraining: Training | null;
};

const initialState: SliceState = { trainings: [], activeTraining: null };

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
        state.activeTraining = { ...action.payload, state: TrainingStateEnum.IN_PROGRESS };
      },
      prepare(training: Training) {
        return { payload: training };
      }
    },

    updateTrainingStep: {
      reducer(state, action: PayloadAction<{ stepId: UID_V4; step: ITrainingStep }>) {
        if (state.activeTraining) {
          const { stepId, step } = action.payload;
          const stepIndex = state.activeTraining.steps.findIndex((s) => s.id === stepId);
          state.activeTraining.steps[stepIndex] = step;
        }
      },
      prepare(stepId: UID_V4, step: ITrainingStep) {
        return { payload: { stepId, step } };
      }
    },

    updateTrainingLift: {
      reducer(
        state,
        action: PayloadAction<{
          stepId: UID_V4;
          setId: UID_V4;
          eIndex: number;
          liftIndex: number;
          lift: { weight: string | never; reps: string | never };
        }>
      ) {
        if (state.activeTraining) {
          const { stepId, setId } = action.payload;
          const step = state.activeTraining.steps.find((s) => s.id === stepId);
          const set = step?.sets.find((s) => s.id === setId);
          const { eIndex, liftIndex, lift } = action.payload;
          const exercice = set?.exercices[eIndex];
          if (exercice) exercice.lifts[liftIndex] = { ...exercice.lifts[liftIndex], ...lift };
        }
      },
      prepare(
        stepId: UID_V4,
        setId: UID_V4,
        eIndex: number,
        liftIndex: number,
        lift: { weight: string | never; reps: string | never }
      ) {
        return { payload: { stepId, setId, eIndex, liftIndex, lift } };
      }
    },

    saveTraining(state) {
      state.trainings.push(state.activeTraining as Training);
    },

    finishTraining: {
      reducer(state, action: PayloadAction<{ trainingId: UID_V4 }>) {
        const training = state.trainings.find((t) => t.id === action.payload.trainingId);
        if (training) training.state = TrainingStateEnum.FINISHED;
      },
      prepare(trainingId: UID_V4) {
        return { payload: { trainingId } };
      }
    }
  }
});

export const { setState, startTraining, updateTrainingStep, finishTraining, updateTrainingLift } =
  roomsStore.actions;

export default roomsStore.reducer;
