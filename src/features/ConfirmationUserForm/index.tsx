import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

import { useAuth } from "@/hooks/useAuth";
import Form from "@/components/common/Form";
import ErrorMessage from "@/components/common/ErrorMessage";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { getErrorMessage } from "@/utils/getErrorMessage";
import {
    BUTTON_CONFIRM_USER,
    BUTTON_RESEND_CODE,
    ERROR_EMPTY_FIELD,
    PLACEHOLDER_CONFIRMATION_CODE,
    ROUTE_TO_LOGIN,
    SUCCESS_CONFIRMATION_USER,
    SUCCESS_RESEND_CODE,
} from "@/constants";

interface InputsValidation {
    email: string | null;
    code: string;
}

export default function ConfirmationUserForm() {
    const [code, setCode] = useState("");
    const [searchParams] = useSearchParams();
    const { confirmUser, resendCode, isLoading, setIsLoading, error, setError, resetError } = useAuth();
    let navigate = useNavigate();

    function emailInputValidationUtil({ email }: Pick<InputsValidation, "email">) {
        if (email === null) {
            navigate(ROUTE_TO_LOGIN);
            setIsLoading(false);
            setError("");
            return false;
        }

        return true;
    }

    function inputsValidationUtil({ email, code }: InputsValidation) {
        if (!emailInputValidationUtil({ email })) {
            return false;
        }

        if (!code) {
            setError(ERROR_EMPTY_FIELD);
            setIsLoading(false);
            return false;
        }

        return true;
    }

    async function handleUserConfirmation(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const email = searchParams.get("email");
        setIsLoading(true);

        if (!inputsValidationUtil({ email, code })) {
            return;
        }

        try {
            await confirmUser({ email: email!, code });
            toast.success(SUCCESS_CONFIRMATION_USER);
            navigate("/login");
        } catch (error) {
            const errorMessage = getErrorMessage(error);
            setError(errorMessage);
        }
        setIsLoading(false);
    }

    async function handleResendCode() {
        const email = searchParams.get("email");
        setIsLoading(true);

        if (!emailInputValidationUtil({ email })) {
            return;
        }

        try {
            await resendCode({ email: email! });
            toast.success(SUCCESS_RESEND_CODE);
            resetError();
        } catch (error) {
            const errorMessage = getErrorMessage(error);
            setError(errorMessage);
        }
        setIsLoading(false);
    }

    function onChangeCode(e: React.ChangeEvent<HTMLInputElement>) {
        if (error !== null) {
            resetError();
        }

        setCode(e.target.value);
    }

    return (
        <Form onSubmit={handleUserConfirmation}>
            <ErrorMessage message={error} />
            <Input placeholder={PLACEHOLDER_CONFIRMATION_CODE} onChange={onChangeCode} value={code} />
            <Button isLoading={isLoading} btnText={BUTTON_CONFIRM_USER} />
            <Button type="button" onClick={handleResendCode} isLoading={isLoading} btnText={BUTTON_RESEND_CODE} />
        </Form>
    );
}
