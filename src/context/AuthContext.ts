import { createContext } from "react";
import type { AuthContextType } from "@/types/AuthContextTypes";

export const AuthContext = createContext<AuthContextType | null>(null);