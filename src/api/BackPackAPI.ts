import { Exercice } from '@/types/Exercices.types';

import BaseAPI from './BaseAPI';
import { StepWithExistingExercicePayload, StepWithNewExercicePayload } from './types';

export const getAllPrograms = async () => {
  const response = await BaseAPI.get('/all_programs');
  return response.data;
};

export const getProgramByID = async (id: string) => {
  const response = await BaseAPI.get(`/program/${id}`);
  return response.data;
};

export const getProgramSessions = async (id: string) => {
  const response = await BaseAPI.get(`/program_sessions/${id}`);
  return response.data;
};

export const createProgramSession = async (id: string, name: string) => {
  const response = await BaseAPI.post('/program_session', {
    program_id: id,
    name
  });
  return response.data.program_session_id;
};

export const getProgramSession = async (id: string) => {
  const response = await BaseAPI.get(`/program_session/${id}`);
  return response.data;
};

export const createSessionStepWithExerciceId = async (payload: StepWithExistingExercicePayload) => {
  await BaseAPI.post(`/program_session_step_with_exercice_id`, payload);
};

export const createSessionStepAndExercice = async (payload: StepWithNewExercicePayload) => {
  await BaseAPI.post(`/program_session_step_and_exercice`, payload);
};

export const getExercices = async (): Promise<Exercice[]> => {
  const response = await BaseAPI.get<Exercice[]>(`/exercices`);
  return response.data.exercices;
};
