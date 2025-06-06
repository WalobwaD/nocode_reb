import api, { setAuthToken } from '../config/api';

export const login = async (user_handle: string, password: string): Promise<string> => {
  const res = await api.post('/api:A43o366j:staging/auth/login', { user_handle, password });
  const authToken = res.data.authToken;
  setAuthToken(authToken);
  return authToken;
};

export const getProfile = async (user_handle: string) => {
  const res = await api.get(`/api:zQykoo4c:staging/user/profile?user_handle=${user_handle}`);
  return res.data;
};
