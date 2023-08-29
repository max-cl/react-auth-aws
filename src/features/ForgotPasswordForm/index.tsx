import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

import { useAuth } from "@/hooks/useAuth";
import { getErrorMessage } from "@/utils/getErrorMessage";
import Form from "@/components/common/Form";
import ErrorMessage from "@/components/common/ErrorMessage";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import toast from "react-hot-toast";
import {
    BUTTON_FORGOT_PASSWORD,
    PLACEHOLDER_EMAIL,
    ROUTE_TO_FORGOT_PASSWORD_CONFIRM,
    SUCCESS_FORGOT_PASSWORD,
} from "@/constants";
import { validateSchema } from "./schemaValidation";

export default function ForgotPasswordForm() {
    const { forgotUserPassword, isLoading, setIsLoading, error, setError, resetError } = useAuth();
    let navigate = useNavigate();
    const formRef = useRef<HTMLFormElement>(null);

    async function handleForgotPassword(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);

        if (!formRef.current) {
            return;
        }

        const formData = new FormData(formRef.current);
        const data = Object.fromEntries(formData);

        try {
            const { email } = validateSchema.parse(data);
            await forgotUserPassword({ email });
            toast.success(SUCCESS_FORGOT_PASSWORD);
            navigate(`${ROUTE_TO_FORGOT_PASSWORD_CONFIRM}?email=${email}`);
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
        <Form ref={formRef} onSubmit={handleForgotPassword}>
            <ErrorMessage message={error} />
            <Input placeholder={PLACEHOLDER_EMAIL} onChange={() => resetError()} name="email" />
            <Button isLoading={isLoading} btnText={BUTTON_FORGOT_PASSWORD} />
        </Form>
    );
}
