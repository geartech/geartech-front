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
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  authenticated: false,
  login: async () => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserLoginDTO | null>({});

  const load = useCallback(async () => {
    await geartechApi.auth
      .getLoggedUser()
      .then((res) => setUser(res.data))
      .catch(() => setUser(null));
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
