import axios from 'axios';

const api = axios.create({
  baseURL: 'https://xsrr-l2ye-dpbj.f2.xano.io',
  headers: {
    'X-Data-Source': 'staging',
  },
});

export const setAuthToken = (token: string) => {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export default api;
