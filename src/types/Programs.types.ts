import { ExerciceType } from './Exercices.types';
import { UID_V4 } from './global.types';

export enum ProgramStatus {
  ACTIVE = 'active',
  ARCHIVED = 'archived',
  DRAFT = 'draft'
}
export interface StepExercice {
  exerciceId: UID_V4;
  weight: string;
  reps: string;
}
export interface ProgramSessionStep {
  id: UID_V4;
  exercices: StepExercice[];
  setNumber: string;
  restTime: string;
  type: ExerciceType;
}
export interface ProgramSession {
  id: UID_V4;
  name: string;
  exercices_number: number;
  steps: ProgramSessionStep[];
}
export interface Program {
  id: UID_V4;
  name: string;
  status: ProgramStatus;
  program_sessions: ProgramSession[];
  created_at?: string;
}
