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
  NORMAL = 'normal',
  SUPERSET = 'Superset',
  DROPSET = 'Dropset'
}

export interface Exercice {
  id: string;
  name: string;
  description?: string;
}

export interface NormalSetFormData {
  name: string;
  isUnilateral: boolean;
  weight: string;
  reps: string;
  sets: string;
  restTime: string;
}
