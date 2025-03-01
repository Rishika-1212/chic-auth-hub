
export interface User {
  _id?: string;
  name: string;
  email: string;
  password?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  name: string;
  email: string;
  password: string;
}

export interface AuthFormProps {
  onLogin: (credentials: LoginCredentials) => Promise<void>;
  onSignup: (credentials: SignupCredentials) => Promise<void>;
  error: string | null;
  loading: boolean;
}

export interface PasswordStrength {
  score: number;
  feedback: string;
  color: string;
}
