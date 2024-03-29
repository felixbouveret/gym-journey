import { ExerciceType, UID_V4 } from '@/types/Exercices.types';

import ExerciceContainer from '../ExerciceContainer';
import NormalSet from './components/NormalSet';
import SuperSet from './components/SuperSet';

interface SessionStepProps {
  item: {
    type: ExerciceType;
    setNumber: string;
    restTime: string;
    exercices: {
      exerciceId: UID_V4;
      reps: string;
      weight: string;
    }[];
  };
  onOptions?: () => void;
  onLongPress?: () => void;
}

export default function SessionStep({ onOptions, onLongPress, item }: SessionStepProps) {
  return (
    <ExerciceContainer
      onLongPress={onLongPress ? () => onLongPress?.() : undefined}
      onOptions={onOptions ? () => onOptions?.() : undefined}
    >
      {item.type === ExerciceType.NORMAL ? <NormalSet item={item} /> : <SuperSet item={item} />}
    </ExerciceContainer>
  );
}
