'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { UserLoginDTO } from '../sdk/api';
import { geartechApi } from '../sdk';

export interface CredentialsProps {
  username: string;
  password: string;
}

interface AuthContextProps {
  user: UserLoginDTO | null;
  authenticated: boolean;
  login(credentials: CredentialsProps): Promise<void>;
  logout(): Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  authenticated: false,
  login: async () => {},
  logout: async () => {},
  loading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserLoginDTO | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      const res = await geartechApi.auth.getLoggedUser();
      setUser(res.data);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const login = async (credentials: CredentialsProps) => {
    await geartechApi.auth.login(credentials);
    await load();
  };

  const logout = async () => {
    await geartechApi.auth.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        authenticated: !!user,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
