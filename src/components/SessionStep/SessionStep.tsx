import { ExerciceType } from '@/types/Exercices.types';
import { ProgramSessionStep } from '@/types/Programs.types';

import ExerciceContainer from '../ExerciceContainer';
import NormalSet from './components/NormalSet';
import SuperSet from './components/SuperSet';

interface SessionStepProps {
  step: ProgramSessionStep;
  onOptions?: () => void;
  onLongPress?: () => void;
}

export default function SessionStep({ onOptions, onLongPress, step }: SessionStepProps) {
  return (
    <ExerciceContainer
      onLongPress={onLongPress ? () => onLongPress?.() : undefined}
      onOptions={onOptions ? () => onOptions?.() : undefined}
    >
      {step.step_type === ExerciceType.NORMAL ? (
        <NormalSet step={step} />
      ) : (
        <SuperSet step={step} />
      )}
    </ExerciceContainer>
  );
}
