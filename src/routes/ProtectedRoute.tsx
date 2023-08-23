import { Navigate, Outlet } from "react-router-dom";
import { ROUTE_TO_HOME } from "@/constants";
import { useAuth } from "@/hooks/useAuth";

export function ProtectedRoute() {
    const { isAuthenticated } = useAuth();

    return isAuthenticated ? <Outlet /> : <Navigate to={ROUTE_TO_HOME} />;
}
