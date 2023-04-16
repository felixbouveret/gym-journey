import { UID_V4 } from './global.types';

export enum ExerciceEquipment {
  NONE = 'None',
  BARBELL = 'Barbell',
  BUMBBELL = 'Dumbbell',
  KETTLEBELL = 'Kettlebell',
  BODYWEIGHT = 'Bodyweight',
  MACHINE = 'Machine',
  OTHER = 'Other'
}

export enum ExerciceType {
  NORMAL = 'Normal',
  SUPERSET = 'Superset',
  DROPSET = 'Dropset'
}

export interface Exercice {
  id: UID_V4;
  name: string;
  description?: string;
  isUnilateral: boolean;
  equipment?: ExerciceEquipment;
}

export interface NormalSetFormData {
  name: string;
  isUnilateral: boolean;
  weight: string;
  reps: string;
  sets: string;
  restTime: string;
}
