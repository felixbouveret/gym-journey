import { ProgramSessionStep } from '@/store/Programs';

export default function useTime() {
  const getAverageTime = (steps: ProgramSessionStep[]) =>
    steps.reduce((acc, step) => acc + (parseInt(step.restTime) + 1) * parseInt(step.setNumber), 0);

  return {
    getAverageTime
  };
}
