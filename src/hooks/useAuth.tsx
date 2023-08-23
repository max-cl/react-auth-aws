import { useContext } from "react";

import { AuthContext } from "@/contexts/Auth";
import { AuthContextProps } from "@/interfaces/auth";

export const useAuth = (): AuthContextProps => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
