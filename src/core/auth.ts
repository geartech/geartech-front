export const getToken = (type: 'access' | 'refresh' = 'access') => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(type === 'access' ? 'accessToken' : 'refreshToken');
};

export const setToken = (access: string, refresh: string) => {
  localStorage.setItem('accessToken', access);
  localStorage.setItem('refreshToken', refresh);
};

export const logout = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  window.location.href = '/login';
};
