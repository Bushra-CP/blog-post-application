import type { User } from "firebase/auth";

//User Auth State Interface
export interface AuthState {
  user: User | null;
  loading: boolean;
}

//Action type for Auth Reducer
export type Action =
  | { type: "SET_USER"; payload: User | null }
  | { type: "SET_LOADING"; payload: boolean };

//Interface for Auth State and Actions
export interface AuthContextType {
  state: AuthState;
  dispatch: React.Dispatch<Action>;
  signup: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}
