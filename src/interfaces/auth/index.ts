export interface SignIn {
    email: string;
    password: string;
}

export interface SignUp {
    password: string;
    email: string;
    family_name: string;
    given_name: string;
}

export interface ConfirmUser {
    email: string;
    code: string;
}

export interface ResendCode {
    email: string;
}

export interface ForgotUserPassword {
    email: string;
}

export interface ForgotUserPasswordConfirm {
    email: string;
    code: string;
    password: string;
}

export interface UpdateUserAttributes {
    given_name: string;
    family_name: string;
}

export interface ChangeUserPassword {
    oldPassword: string;
    newPassword: string;
}

export interface UserAttributes {
    email: string;
    given_name: string;
    family_name: string;
}

export interface Props {
    children: React.ReactNode;
}

export interface AuthContextProps {
    isAuthenticated: boolean;
    signIn: ({ email, password }: SignIn) => Promise<void>;
    signOut: () => Promise<void>;
    signUp: ({ email, password, family_name, given_name }: SignUp) => Promise<void>;
    confirmUser: ({ email, code }: ConfirmUser) => Promise<void>;
    resendCode: ({ email }: ResendCode) => Promise<void>;
    forgotUserPassword: ({ email }: ForgotUserPassword) => Promise<void>;
    forgotUserPasswordConfirm: ({ email, code, password }: ForgotUserPasswordConfirm) => Promise<void>;
    updateUserAttributes: ({ given_name, family_name }: UpdateUserAttributes) => Promise<string | undefined>;
    changeUserPassword: ({ oldPassword, newPassword }: ChangeUserPassword) => Promise<string | undefined>;
    resetError: () => void;
    error: string | null;
    setError: React.Dispatch<React.SetStateAction<string | null>>;
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    userAttributes: UserAttributes | undefined;
}
