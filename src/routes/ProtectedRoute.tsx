import { LoadingScreen } from "@/components/sharedComponents/LoadingScreen";
import { useAuth } from "@/context/useAuth";
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { state } = useAuth();

  if (state.loading) {
    return <LoadingScreen />;
  }

  if (!state.user) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;
