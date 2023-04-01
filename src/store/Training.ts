import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ExerciceType } from '@/types/Exercices.types';

import { UID_V4 } from './Programs';

export enum TrainingStateEnum {
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  FINISHED = 'FINISHED'
}

export type ITrainingLift = {
  weight: string;
  reps: string;
};
export interface TrainingExercice {
  exerciceId: UID_V4;
  weight: string;
  reps: string;
  lift: ITrainingLift;
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
  finishedAt?: string;
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

    setActiveTraining: {
      reducer(state, action: PayloadAction<UID_V4>) {
        const training = state.trainings.find((t) => t.id === action.payload);
        if (training) state.activeTraining = training;
      },
      prepare(id: UID_V4) {
        return { payload: id };
      }
    },

    updateTraining: {
      reducer(state, action: PayloadAction<{ training: Training }>) {
        if (state.activeTraining) {
          state.activeTraining = action.payload.training;
        }
      },
      prepare(training: Training) {
        return { payload: { training } };
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
          exerciceIndex: number;
          lift: ITrainingLift;
        }>
      ) {
        if (state.activeTraining) {
          const steps = state.activeTraining.steps;
          const stepIndex = steps.findIndex((s) => s.id === action.payload.stepId);
          const setIndex = steps[stepIndex].sets.findIndex((s) => s.id === action.payload.setId);

          steps[stepIndex].sets[setIndex].exercices[action.payload.exerciceIndex].lift =
            action.payload.lift;
        }
      },
      prepare(stepId: UID_V4, setId: UID_V4, exerciceIndex: number, lift: ITrainingLift) {
        return { payload: { stepId, setId, exerciceIndex, lift } };
      }
    },

    saveTraining(state) {
      if (state.trainings.find((t) => t.id === state.activeTraining?.id))
        state.trainings = state.trainings.map((t) =>
          t.id === state.activeTraining?.id ? (state.activeTraining as Training) : t
        );
      else state.trainings.push(state.activeTraining as Training);
    },

    finishTraining: {
      reducer(state, action: PayloadAction<{ trainingId: UID_V4 }>) {
        const training = state.trainings.find((t) => t.id === action.payload.trainingId);
        if (training) {
          training.state = TrainingStateEnum.FINISHED;
          training.finishedAt = new Date().toISOString();
        }
      },
      prepare(trainingId: UID_V4) {
        return { payload: { trainingId } };
      }
    },

    removeTraining: {
      reducer(state, action: PayloadAction<{ trainingId: UID_V4 }>) {
        state.trainings = state.trainings.filter((t) => t.id !== action.payload.trainingId);
      },
      prepare(trainingId: UID_V4) {
        return { payload: { trainingId } };
      }
    }
  }
});

export const {
  setState,
  setActiveTraining,
  startTraining,
  updateTraining,
  updateTrainingStep,
  finishTraining,
  updateTrainingLift,
  saveTraining,
  removeTraining
} = roomsStore.actions;

export default roomsStore.reducer;
