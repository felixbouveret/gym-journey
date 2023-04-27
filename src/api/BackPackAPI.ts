import BaseAPI from './BaseAPI';

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
