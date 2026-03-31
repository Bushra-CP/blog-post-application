import { auth } from "@/firebase/firebaseAuth";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useEffect, useReducer, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import type { Action, AuthState } from "@/types/AuthContextTypes";
import { setDoc, doc } from "firebase/firestore";
import { db } from "@/firebase/firebaseDB";

const initialState: AuthState = {
  user: null,
  loading: true,
};

const authReducer = (state: AuthState, action: Action) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      dispatch({ type: "SET_USER", payload: user });
      dispatch({ type: "SET_LOADING", payload: false });
    });
    return () => unsubscribe();
  }, []);

  const signup = async (email: string, password: string) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const user = userCredential.user;
    //store user in firebase
    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      uid: user.uid,
      createdAt: new Date(),
    });
  };

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ state, dispatch, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
