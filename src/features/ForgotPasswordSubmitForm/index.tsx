import { useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { z } from "zod";

import Button from "@/components/common/Button";
import ErrorMessage from "@/components/common/ErrorMessage";
import Form from "@/components/common/Form";
import Input from "@/components/common/Input";
import { useAuth } from "@/hooks/useAuth";
import { getErrorMessage } from "@/utils/getErrorMessage";
import toast from "react-hot-toast";
import {
    BUTTON_FORGOT_PASSWORD_CONFIRM,
    PLACEHOLDER_CONFIRMATION_CODE,
    PLACEHOLDER_NEW_PASSWORD,
    PLACEHOLDER_NEW_REPASSWORD,
    ROUTE_TO_LOGIN,
    SUCCESS_FORGOT_PASSWORD_CONFIRM,
} from "@/constants";
import { validateSchema } from "./schemaValidation";

export default function ForgotPasswordSubmitForm() {
    const [searchParams] = useSearchParams();
    const { forgotUserPasswordConfirm, isLoading, setIsLoading, error, setError, resetError } = useAuth();
    const navigate = useNavigate();
    const formRef = useRef<HTMLFormElement>(null);

    function checkEmailParamIsNull({ email }: { email: string | null }) {
        if (email === null || email.length === 0) {
            navigate(ROUTE_TO_LOGIN);
            setIsLoading(false);
            resetError();
            return false;
        }

        return true;
    }

    async function handleForgotPasswordSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const email = searchParams.get("email");
        setIsLoading(true);

        if (!formRef.current) {
            return;
        }

        if (!checkEmailParamIsNull({ email })) {
            return;
        }

        const formData = new FormData(formRef.current);
        const data = Object.fromEntries(formData);

        try {
            const { password, code } = validateSchema.parse(data);
            await forgotUserPasswordConfirm({ email: email!, code, password });
            toast.success(SUCCESS_FORGOT_PASSWORD_CONFIRM);
            navigate(ROUTE_TO_LOGIN);
        } catch (error) {
            if (error instanceof z.ZodError) {
                const zodErrors = error.errors[0].message;
                setError(zodErrors);
            } else {
                const errorMessage = getErrorMessage(error);
                setError(errorMessage);
            }
        }
        setIsLoading(false);
    }

    return (
        <Form ref={formRef} onSubmit={handleForgotPasswordSubmit}>
            <ErrorMessage message={error} />
            <Input
                type="password"
                placeholder={PLACEHOLDER_NEW_PASSWORD}
                onChange={() => resetError()}
                name="password"
            />
            <Input
                type="password"
                placeholder={PLACEHOLDER_NEW_REPASSWORD}
                onChange={() => resetError()}
                name="confirmPassword"
            />
            <Input placeholder={PLACEHOLDER_CONFIRMATION_CODE} onChange={() => resetError()} name="code" />
            <Button isLoading={isLoading} btnText={BUTTON_FORGOT_PASSWORD_CONFIRM} />
        </Form>
    );
}
