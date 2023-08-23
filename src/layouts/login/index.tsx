import { useState } from "react";
import { Navigate } from "react-router-dom";

import LinkBack from "@/components/LinkBack";
import LoginForm from "@/features/LoginForm";
import LoginFormOptions from "@/features/LoginFormOptions";
import SignupForm from "@/features/SignupForm";
import { LINK_TO_FORGOT_PASSWORD, ROUTE_TO_FORGOT_PASSWORD, ROUTE_TO_HOME } from "@/constants";
import { useAuth } from "@/hooks/useAuth";

export default function LoginLayout() {
    const [isLoginForm, setIsLoginForm] = useState(true);
    const { isAuthenticated } = useAuth();

    if (isAuthenticated) {
        return <Navigate to={ROUTE_TO_HOME} replace />;
    }

    return (
        <div className="card w-96 px-4 py-4 shadow-md bg-black">
            <>
                <LoginFormOptions isLoginForm={isLoginForm} setIsLoginForm={setIsLoginForm} />
            </>
            {isLoginForm ? (
                <>
                    <LoginForm />
                    <LinkBack to={ROUTE_TO_FORGOT_PASSWORD} linkText={LINK_TO_FORGOT_PASSWORD} />
                </>
            ) : (
                <SignupForm setIsLoginForm={setIsLoginForm} />
            )}
        </div>
    );
}
