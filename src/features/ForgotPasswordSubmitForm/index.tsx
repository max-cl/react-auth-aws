import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import Button from "@/components/common/Button";
import ErrorMessage from "@/components/common/ErrorMessage";
import Form from "@/components/common/Form";
import Input from "@/components/common/Input";
import { useAuth } from "@/hooks/useAuth";
import { getErrorMessage } from "@/utils/getErrorMessage";
import toast from "react-hot-toast";
import {
    BUTTON_FORGOT_PASSWORD_CONFIRM,
    ERROR_EMPTY_FIELDS,
    ERROR_PASSWORDS_NOT_MATCH,
    PLACEHOLDER_CONFIRMATION_CODE,
    PLACEHOLDER_NEW_PASSWORD,
    PLACEHOLDER_NEW_REPASSWORD,
    ROUTE_TO_LOGIN,
    SUCCESS_FORGOT_PASSWORD_CONFIRM,
} from "@/constants";

interface InputsValidation {
    email: string | null;
    password: string;
    repassword: string;
    code: string;
}

export default function ForgotPasswordSubmitForm() {
    const [password, setPassword] = useState("");
    const [repassword, setRePassword] = useState("");
    const [code, setCode] = useState("");
    const [searchParams] = useSearchParams();
    const { forgotUserPasswordConfirm, isLoading, setIsLoading, error, setError, resetError } = useAuth();
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

    function inputsValidationUtil({ email, password, repassword, code }: InputsValidation) {
        if (!emailInputValidationUtil({ email })) {
            return false;
        }

        if (password.length === 0 || repassword.length === 0 || code.length === 0) {
            setError(ERROR_EMPTY_FIELDS);
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

    async function handleForgotPasswordSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const email = searchParams.get("email");
        setIsLoading(true);

        if (!inputsValidationUtil({ email, password, repassword, code })) {
            return;
        }

        try {
            await forgotUserPasswordConfirm({ email: email!, code, password });
            toast.success(SUCCESS_FORGOT_PASSWORD_CONFIRM);
            navigate(ROUTE_TO_LOGIN);
        } catch (error) {
            const errorMessage = getErrorMessage(error);
            setError(errorMessage);
        }
        setIsLoading(false);
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

    function onChangeCode(e: React.ChangeEvent<HTMLInputElement>) {
        if (error !== null) {
            resetError();
        }

        setCode(e.target.value);
    }

    return (
        <Form onSubmit={handleForgotPasswordSubmit}>
            <ErrorMessage message={error} />
            <Input
                type="password"
                placeholder={PLACEHOLDER_NEW_PASSWORD}
                onChange={onChangePassword}
                value={password}
            />
            <Input
                type="password"
                placeholder={PLACEHOLDER_NEW_REPASSWORD}
                onChange={onChangeRePassword}
                value={repassword}
            />
            <Input placeholder={PLACEHOLDER_CONFIRMATION_CODE} onChange={onChangeCode} value={code} />
            <Button isLoading={isLoading} btnText={BUTTON_FORGOT_PASSWORD_CONFIRM} />
        </Form>
    );
}
