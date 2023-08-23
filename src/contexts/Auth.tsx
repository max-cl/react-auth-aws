import { createContext, useState, useEffect } from "react";
import { Auth } from "aws-amplify";

import {
    SignIn,
    SignUp,
    ConfirmUser,
    ResendCode,
    ForgotUserPassword,
    ForgotUserPasswordConfirm,
    UpdateUserAttributes,
    UserAttributes,
    Props,
    AuthContextProps,
    ChangeUserPassword,
} from "@/interfaces/auth";

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProvider({ children }: Props) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userAttributes, setUserAttributes] = useState<UserAttributes>();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        checkAuthState();
    }, []);

    async function checkAuthState() {
        try {
            const response = await Auth.currentAuthenticatedUser({ bypassCache: true });
            setIsAuthenticated(true);
            setUserAttributes({
                email: response?.attributes?.email,
                given_name: response?.attributes?.given_name,
                family_name: response?.attributes?.family_name,
            });

            if (import.meta.env.VITE_ENVIRONMENT === "development") {
                console.log("User is AUTHENTICATED!! ", response);
            }
        } catch (error) {
            setIsAuthenticated(false);
            if (import.meta.env.VITE_ENVIRONMENT === "development") {
                console.log("User IS UNAUTHENTICATED!!");
            }
        }
    }

    async function signIn({ email, password }: SignIn) {
        try {
            const response = await Auth.signIn(email, password);
            setIsAuthenticated(true);
            setUserAttributes({
                email: response?.attributes?.email,
                given_name: response?.attributes?.given_name,
                family_name: response?.attributes?.family_name,
            });

            if (import.meta.env.VITE_ENVIRONMENT === "development") {
                console.log("Login SUCCESS: ", response);
            }
        } catch (error) {
            if (import.meta.env.VITE_ENVIRONMENT === "development") {
                console.log("Error signing in:", JSON.parse(JSON.stringify(error)));
            }
            throw error;
        }
    }

    async function signOut() {
        try {
            await Auth.signOut();
            setIsAuthenticated(false);
        } catch (error) {
            if (import.meta.env.VITE_ENVIRONMENT === "development") {
                console.log("[ERROR] signing out: ", JSON.parse(JSON.stringify(error)));
            }
            throw error;
        }
    }

    async function signUp({ email, password, family_name, given_name }: SignUp) {
        try {
            await Auth.signUp({
                username: email,
                password,
                attributes: {
                    email,
                    family_name,
                    given_name,
                },
            });
        } catch (error) {
            if (import.meta.env.VITE_ENVIRONMENT === "development") {
                console.log("[ERROR] signing up: ", JSON.parse(JSON.stringify(error)));
            }
            throw error;
        }
    }

    async function confirmUser({ email, code }: ConfirmUser) {
        try {
            await Auth.confirmSignUp(email, code);
        } catch (error) {
            if (import.meta.env.VITE_ENVIRONMENT === "development") {
                console.log("[ERROR] confirming user: ", JSON.parse(JSON.stringify(error)));
            }
            throw error;
        }
    }

    async function resendCode({ email }: ResendCode) {
        try {
            await Auth.resendSignUp(email);
        } catch (error) {
            if (import.meta.env.VITE_ENVIRONMENT === "development") {
                console.log("[ERROR] Resending code: ", JSON.parse(JSON.stringify(error)));
            }
            throw error;
        }
    }

    async function forgotUserPassword({ email }: ForgotUserPassword) {
        try {
            await Auth.forgotPassword(email);
        } catch (error) {
            if (import.meta.env.VITE_ENVIRONMENT === "development") {
                console.log("[ERROR] Forgot Password: ", JSON.parse(JSON.stringify(error)));
            }
            throw error;
        }
    }

    async function forgotUserPasswordConfirm({ email, code, password }: ForgotUserPasswordConfirm) {
        try {
            await Auth.forgotPasswordSubmit(email, code, password);
        } catch (error) {
            if (import.meta.env.VITE_ENVIRONMENT === "development") {
                console.log("[ERROR] Forgot Password Confirm: ", JSON.parse(JSON.stringify(error)));
            }
            throw error;
        }
    }

    async function updateUserAttributes({ given_name, family_name }: UpdateUserAttributes) {
        try {
            const user = await Auth.currentAuthenticatedUser();

            const result = await Auth.updateUserAttributes(user, {
                given_name,
                family_name,
            });

            setUserAttributes({
                email: user?.attributes?.email,
                given_name,
                family_name,
            });

            return result;
        } catch (error) {
            if (import.meta.env.VITE_ENVIRONMENT === "development") {
                console.log("[ERROR] Updating User Attributes: ", JSON.parse(JSON.stringify(error)));
            }
            throw error;
        }
    }

    async function changeUserPassword({ oldPassword, newPassword }: ChangeUserPassword) {
        try {
            const user = await Auth.currentAuthenticatedUser();
            const result = await Auth.changePassword(user, oldPassword, newPassword);
            return result;
        } catch (error) {
            if (import.meta.env.VITE_ENVIRONMENT === "development") {
                console.log("[ERROR] Changing password: ", JSON.parse(JSON.stringify(error)));
            }
            throw error;
        }
    }

    function resetError() {
        if (typeof error === "string") setError(null);
    }

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                userAttributes,
                signIn,
                signOut,
                signUp,
                confirmUser,
                resendCode,
                forgotUserPassword,
                forgotUserPasswordConfirm,
                updateUserAttributes,
                changeUserPassword,
                resetError,
                error,
                setError,
                isLoading,
                setIsLoading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
