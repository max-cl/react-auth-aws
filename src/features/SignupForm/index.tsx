import { useState } from "react";

import { useAuth } from "@/hooks/useAuth";
import Form from "@/components/common/Form";
import ErrorMessage from "@/components/common/ErrorMessage";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { validateEmail } from "@/utils/validateEmail";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { toast } from "react-hot-toast";
import {
    BUTTON_SIGNUP,
    ERROR_EMPTY_FIELDS,
    ERROR_INVALID_EMAIL,
    ERROR_PASSWORDS_NOT_MATCH,
    PLACEHOLDER_EMAIL,
    PLACEHOLDER_FIRSTNAME,
    PLACEHOLDER_LASTNAME,
    PLACEHOLDER_PASSWORD,
    PLACEHOLDER_REPASSWORD,
    SUCCESS_SIGNUP,
} from "@/constants";

interface Props {
    setIsLoginForm: React.Dispatch<React.SetStateAction<boolean>>;
}

interface InputsValidation {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    repassword: string;
}

export default function SignupForm({ setIsLoginForm }: Props) {
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [repassword, setRePassword] = useState<string>("");
    const { signUp, isLoading, setIsLoading, error, setError, resetError } = useAuth();

    function inputsValidationUtil({ firstName, lastName, email, password, repassword }: InputsValidation) {
        if (
            firstName.trim().length === 0 ||
            lastName.trim().length === 0 ||
            email.trim().length === 0 ||
            password.trim().length === 0 ||
            repassword.trim().length === 0
        ) {
            setError(ERROR_EMPTY_FIELDS);
            setIsLoading(false);
            return false;
        }

        if (!validateEmail({ email })) {
            setError(ERROR_INVALID_EMAIL);
            setIsLoading(false);
            return false;
        }

        if (password !== repassword) {
            setError(ERROR_PASSWORDS_NOT_MATCH);
            setIsLoading(false);
            return false;
        }

        return true;
    }

    async function handleSignUp(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);

        if (!inputsValidationUtil({ firstName, lastName, email, password, repassword })) {
            return;
        }

        try {
            await signUp({ given_name: firstName, family_name: lastName, email, password });
            toast.success(SUCCESS_SIGNUP);
            setError("");
            setIsLoginForm(true);
            resetInputs();
        } catch (error) {
            const errorMessage = getErrorMessage(error);
            setError(errorMessage);
        }
        setIsLoading(false);
    }

    function onChangeFirstName(e: React.ChangeEvent<HTMLInputElement>) {
        if (error !== null) {
            resetError();
        }

        setFirstName(e.target.value);
    }

    function onChangeLastName(e: React.ChangeEvent<HTMLInputElement>) {
        if (error !== null) {
            resetError();
        }

        setLastName(e.target.value);
    }

    function onChangeEmail(e: React.ChangeEvent<HTMLInputElement>) {
        if (error !== null) {
            resetError();
        }

        setEmail(e.target.value.toLowerCase());
    }

    function onChangePassword(e: React.ChangeEvent<HTMLInputElement>) {
        if (error !== null) {
            resetError();
        }

        setPassword(e.target.value);
    }

    function onChangeRePassword(e: React.ChangeEvent<HTMLInputElement>) {
        if (error !== null) {
            resetError();
        }

        setRePassword(e.target.value);
    }

    function resetInputs() {
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setRePassword("");
    }

    return (
        <Form onSubmit={handleSignUp}>
            <ErrorMessage message={error} />
            <Input placeholder={PLACEHOLDER_FIRSTNAME} onChange={onChangeFirstName} value={firstName} />
            <Input placeholder={PLACEHOLDER_LASTNAME} onChange={onChangeLastName} value={lastName} />
            <Input placeholder={PLACEHOLDER_EMAIL} onChange={onChangeEmail} value={email} />
            <Input type="password" placeholder={PLACEHOLDER_PASSWORD} onChange={onChangePassword} value={password} />
            <Input
                type="password"
                placeholder={PLACEHOLDER_REPASSWORD}
                onChange={onChangeRePassword}
                value={repassword}
            />
            <Button isLoading={isLoading} btnText={BUTTON_SIGNUP} />
        </Form>
    );
}
