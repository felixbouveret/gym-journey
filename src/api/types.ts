import { ExerciceType } from '@/types/Exercices.types';

export enum HttpVerbsEnum {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
  PATCH = 'patch',
  OPTIONS = 'options'
}

type StepNewExercice = {
  name: string;
  description: string;
  weight: string;
  reps: string;
};
export type StepWithNewExercicePayload = {
  program_session_id: string;
  set_number: number;
  rest_time: number;
  step_type: ExerciceType;
  exercices: StepNewExercice[];
};

type StepExistingExercice = {
  id: string;
  weight: string;
  reps: string;
};

export type StepWithExistingExercicePayload = {
  program_session_id: string;
  set_number: number;
  rest_time: number;
  step_type: ExerciceType;
  exercices: StepExistingExercice[];
};
