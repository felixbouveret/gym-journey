import { ExerciceType } from './Exercices.types';

export enum ProgramStatus {
  ACTIVE = 'active',
  ARCHIVED = 'archived',
  DRAFT = 'draft'
}
export interface StepExercice {
  name: string;
  weight: number;
  reps: number;
}
export interface ProgramSessionStep {
  id: string;
  set_number: number;
  rest_time: number;
  step_type: ExerciceType;
  exercices: StepExercice[];
}
export interface ProgramSession {
  steps: ProgramSessionStep[];
}
export interface ProgramSessionSimplified {
  id: string;
  name: string;
  program_id: string;
  program_session_details: {
    exercice_name: string;
    set_number: number;
    reps: number;
    weight: number;
  }[];
  total_rest_time: 0;
  created_at: string;
}
export interface ProgramSimplified {
  created_at: string;
  id: string;
  name: string;
  program_sessions: {
    exercices_number: number;
    name: string;
    program_session_id: string;
  }[];
  status: ProgramStatus;
}
