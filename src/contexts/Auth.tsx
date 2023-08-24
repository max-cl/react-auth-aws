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
import { developmentLogs } from "@/utils/developmentLogs";

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

            developmentLogs({ message: "User is AUTHENTICATED!!", response });
        } catch (error) {
            setIsAuthenticated(false);
            developmentLogs({ message: "User is UNAUTHENTICATED!!", response: error });
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

            developmentLogs({ message: "Login SUCCESS: ", response });
        } catch (error) {
            developmentLogs({ message: "[ERROR] Signing in: ", response: error });
            throw error;
        }
    }

    async function signOut() {
        try {
            await Auth.signOut();
            setIsAuthenticated(false);
        } catch (error) {
            developmentLogs({ message: "[ERROR] Signing out: ", response: error });
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
            developmentLogs({ message: "[ERROR] Signing up: ", response: error });
            throw error;
        }
    }

    async function confirmUser({ email, code }: ConfirmUser) {
        try {
            await Auth.confirmSignUp(email, code);
        } catch (error) {
            developmentLogs({ message: "[ERROR] Confirming user: ", response: error });
            throw error;
        }
    }

    async function resendCode({ email }: ResendCode) {
        try {
            await Auth.resendSignUp(email);
        } catch (error) {
            developmentLogs({ message: "[ERROR] Resending code: ", response: error });
            throw error;
        }
    }

    async function forgotUserPassword({ email }: ForgotUserPassword) {
        try {
            await Auth.forgotPassword(email);
        } catch (error) {
            developmentLogs({ message: "[ERROR] Forgot Password: ", response: error });
            throw error;
        }
    }

    async function forgotUserPasswordConfirm({ email, code, password }: ForgotUserPasswordConfirm) {
        try {
            await Auth.forgotPasswordSubmit(email, code, password);
        } catch (error) {
            developmentLogs({ message: "[ERROR] Forgot Password Confirm: ", response: error });
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
            developmentLogs({ message: "[ERROR] Updating User Attributes: ", response: error });
            throw error;
        }
    }

    async function changeUserPassword({ oldPassword, newPassword }: ChangeUserPassword) {
        try {
            const user = await Auth.currentAuthenticatedUser();
            const result = await Auth.changePassword(user, oldPassword, newPassword);
            return result;
        } catch (error) {
            developmentLogs({ message: "[ERROR] Changing password: ", response: error });
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
