'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { getToken, logout } from '../auth';
import { UserLoginDTO } from '../sdk/api';
import { geartechApi } from '../sdk';

interface AuthContextType {
  user: UserLoginDTO | undefined;
  loading: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: undefined,
  loading: true,
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserLoginDTO | undefined>({});
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await geartechApi.auth.getLoggedUser();
      setUser(res.data);
    } catch {
      logout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = getToken();
    if (token) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  return <AuthContext.Provider value={{ user, loading, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
