import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { User } from '@/types';
import { apiFetch } from '@/lib/api';

interface LoginResponse {
  success: boolean;
  data: {
    token: string;
    user: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      role: 'ADMIN' | 'FIELD_WORKER';
      status: 'ACTIVE' | 'INACTIVE';
    };
  };
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore user from localStorage when the app starts
  useEffect(() => {
    const storedUser = localStorage.getItem('impact_user');

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem('impact_user');
        localStorage.removeItem('token');
      }
    }

    setIsLoading(false);
  }, []);

  const login = async (
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      const response = await apiFetch<LoginResponse>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      const { token, user: apiUser } = response.data;

      // Convert backend user to frontend User type
      const frontendUser: User = {
        id: apiUser.id,
        email: apiUser.email,
        name: `${apiUser.firstName} ${apiUser.lastName}`,
        role: apiUser.role === 'ADMIN' ? 'admin' : 'field_worker',
      };

      // Save auth state
      localStorage.setItem('token', token);
      localStorage.setItem(
        'impact_user',
        JSON.stringify(frontendUser)
      );

      setUser(frontendUser);
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('impact_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return ctx;
}