export type UID_V4 = string | number[];

export enum ExerciceEquipment {
  NONE = 'None',
  BARBELL = 'Barbell',
  BUMBBELL = 'Dumbbell',
  KETTLEBELL = 'Kettlebell',
  BODYWEIGHT = 'Bodyweight',
  MACHINE = 'Machine',
  OTHER = 'Other'
}

export interface Exercice {
  id: UID_V4;
  name: string;
  description?: string;
  isUnilateral: boolean;
  equipment?: ExerciceEquipment;
}
