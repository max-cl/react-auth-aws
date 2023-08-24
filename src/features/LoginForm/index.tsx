import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "@/hooks/useAuth";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { validateEmail } from "@/utils/validateEmail";
import ErrorMessage from "@/components/common/ErrorMessage";
import Form from "@/components/common/Form";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { toast } from "react-hot-toast";
import {
    BUTTON_LOGIN,
    ERROR_EMPTY_FIELDS,
    ERROR_INVALID_EMAIL,
    ERROR_USER_NOT_CONFIRMED,
    PLACEHOLDER_EMAIL,
    PLACEHOLDER_PASSWORD,
    ROUTE_TO_CONFIRMATION,
    ROUTE_TO_HOME,
    SUCCESS_LOGIN,
} from "@/constants";

interface InputsValidation {
    email: string;
    password: string;
}

export default function LoginForm() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const { signIn, isLoading, setIsLoading, error, setError, resetError } = useAuth();
    let navigate = useNavigate();

    function inputsValidationUtil({ email, password }: InputsValidation) {
        if (email.length === 0 || password.length === 0) {
            setError(ERROR_EMPTY_FIELDS);
            setIsLoading(false);
            return false;
        }

        if (!validateEmail({ email })) {
            setError(ERROR_INVALID_EMAIL);
            setIsLoading(false);
            return false;
        }
        return true;
    }

    async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);

        if (!inputsValidationUtil({ email, password })) {
            return;
        }

        try {
            await signIn({ email, password });
            toast.success(SUCCESS_LOGIN);
            setError("");
            resetInputs();
            navigate(ROUTE_TO_HOME);
        } catch (error) {
            const errorMessage = getErrorMessage(error);
            setError(errorMessage);
            if (errorMessage === ERROR_USER_NOT_CONFIRMED) {
                navigate(`${ROUTE_TO_CONFIRMATION}?email=${email}`);
                setError("");
            }
        }

        setIsLoading(false);
    }

    function onChangeEmail(e: React.ChangeEvent<HTMLInputElement>) {
        if (error !== null) {
            resetError();
        }

        setEmail(e.target.value.trim().toLowerCase());
    }

    function onChangePassword(e: React.ChangeEvent<HTMLInputElement>) {
        if (error !== null) {
            resetError();
        }

        setPassword(e.target.value);
    }

    function resetInputs() {
        setEmail("");
        setPassword("");
    }

    return (
        <Form onSubmit={handleLogin} cssCustom="rounded-tl-none">
            <ErrorMessage message={error} />
            <Input placeholder={PLACEHOLDER_EMAIL} onChange={onChangeEmail} value={email} />
            <Input type="password" placeholder={PLACEHOLDER_PASSWORD} onChange={onChangePassword} value={password} />
            <Button isLoading={isLoading} btnText={BUTTON_LOGIN} />
        </Form>
    );
}
