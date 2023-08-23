import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "@/hooks/useAuth";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { validateEmail } from "@/utils/validateEmail";
import Form from "@/components/common/Form";
import ErrorMessage from "@/components/common/ErrorMessage";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import toast from "react-hot-toast";
import {
    BUTTON_FORGOT_PASSWORD,
    ERROR_EMPTY_FIELD,
    ERROR_INVALID_EMAIL,
    PLACEHOLDER_EMAIL,
    ROUTE_TO_FORGOT_PASSWORD_CONFIRM,
    SUCCESS_FORGOT_PASSWORD,
} from "@/constants";

interface InputsValidation {
    email: string;
}

export default function ForgotPasswordForm() {
    const [email, setEmail] = useState("");
    const { forgotUserPassword, isLoading, setIsLoading, error, setError, resetError } = useAuth();
    let navigate = useNavigate();

    function inputsValidationUtil({ email }: InputsValidation) {
        if (email.length === 0) {
            setError(ERROR_EMPTY_FIELD);
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

    async function handleForgotPassword(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);

        if (!inputsValidationUtil({ email })) {
            return;
        }

        try {
            await forgotUserPassword({ email });
            toast.success(SUCCESS_FORGOT_PASSWORD);
            navigate(`${ROUTE_TO_FORGOT_PASSWORD_CONFIRM}?email=${email}`);
        } catch (error) {
            const errorMessage = getErrorMessage(error);
            setError(errorMessage);
        }
        setIsLoading(false);
    }

    function onChangeEmail(e: React.ChangeEvent<HTMLInputElement>) {
        if (error !== null) {
            resetError();
        }

        setEmail(e.target.value.trim().toLowerCase());
    }

    return (
        <Form onSubmit={handleForgotPassword}>
            <ErrorMessage message={error} />
            <Input placeholder={PLACEHOLDER_EMAIL} onChange={onChangeEmail} value={email} />
            <Button isLoading={isLoading} btnText={BUTTON_FORGOT_PASSWORD} />
        </Form>
    );
}
