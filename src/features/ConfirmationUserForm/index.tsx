import { useNavigate, useSearchParams } from "react-router-dom";
import { z } from "zod";
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
    PLACEHOLDER_CONFIRMATION_CODE,
    ROUTE_TO_LOGIN,
    SUCCESS_CONFIRMATION_USER,
    SUCCESS_RESEND_CODE,
} from "@/constants";
import { validateSchema } from "./schemaValidation";

interface InputsValidation {
    email: string | null;
    code: string;
}

export default function ConfirmationUserForm() {
    const [searchParams] = useSearchParams();
    const { confirmUser, resendCode, isLoading, setIsLoading, error, setError, resetError } = useAuth();
    let navigate = useNavigate();

    function checkEmailParamIsNull({ email }: Pick<InputsValidation, "email">) {
        if (email === null || email.length === 0) {
            navigate(ROUTE_TO_LOGIN);
            setIsLoading(false);
            resetError();
            return false;
        }

        return true;
    }

    async function handleUserConfirmation(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const email = searchParams.get("email");
        setIsLoading(true);

        if (!checkEmailParamIsNull({ email })) {
            return;
        }

        const formData = new FormData(event.target as HTMLFormElement);
        const data = Object.fromEntries(formData);

        try {
            const { code } = validateSchema.parse(data);
            await confirmUser({ email: email!, code });
            toast.success(SUCCESS_CONFIRMATION_USER);
            resetError();
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

    async function handleResendCode() {
        const email = searchParams.get("email");
        setIsLoading(true);

        if (!checkEmailParamIsNull({ email })) {
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

    return (
        <Form onSubmit={handleUserConfirmation}>
            <ErrorMessage message={error} />
            <Input placeholder={PLACEHOLDER_CONFIRMATION_CODE} onChange={() => resetError()} name="code" />
            <Button isLoading={isLoading} btnText={BUTTON_CONFIRM_USER} />
            <Button type="button" onClick={handleResendCode} isLoading={isLoading} btnText={BUTTON_RESEND_CODE} />
        </Form>
    );
}
