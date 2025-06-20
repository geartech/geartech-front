'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { UserLoginDTO } from '../sdk/api';
import { geartechApi } from '../sdk';

interface AuthContextType {
  user: UserLoginDTO | undefined;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: undefined,
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserLoginDTO | undefined>({});

  const fetchUser = async () => {
    try {
      const res = await geartechApi.auth.getLoggedUser();
      setUser(res.data);
    } catch {
      // logout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {}, []);

  return <AuthContext.Provider value={{ user, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
