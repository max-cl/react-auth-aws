import { useNavigate } from "react-router-dom";
import { z } from "zod";

import { useAuth } from "@/hooks/useAuth";
import { getErrorMessage } from "@/utils/getErrorMessage";
import ErrorMessage from "@/components/common/ErrorMessage";
import Form from "@/components/common/Form";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { toast } from "react-hot-toast";
import {
    BUTTON_LOGIN,
    ERROR_USER_NOT_CONFIRMED,
    PLACEHOLDER_EMAIL,
    PLACEHOLDER_PASSWORD,
    ROUTE_TO_CONFIRMATION,
    ROUTE_TO_HOME,
    SUCCESS_LOGIN,
} from "@/constants";
import { validateSchema } from "./schemaValidation";

export default function LoginForm() {
    const { signIn, isLoading, setIsLoading, error, setError, resetError } = useAuth();
    let navigate = useNavigate();

    async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);

        let email = "";
        const formData = new FormData(event.target as HTMLFormElement);
        const data = Object.fromEntries(formData);

        try {
            const { email, password } = validateSchema.parse(data);
            await signIn({ email, password });
            toast.success(SUCCESS_LOGIN);
            resetError();
            navigate(ROUTE_TO_HOME);
        } catch (error) {
            if (error instanceof z.ZodError) {
                const zodErrors = error.errors.map((err) => `${err.message}`).join("|");
                setError(zodErrors);
            } else {
                const errorMessage = getErrorMessage(error);
                setError(errorMessage);
                if (errorMessage === ERROR_USER_NOT_CONFIRMED) {
                    resetError();
                    navigate(`${ROUTE_TO_CONFIRMATION}?email=${email}`);
                }
            }
        }

        setIsLoading(false);
    }

    return (
        <Form onSubmit={handleLogin} cssCustom="rounded-tl-none">
            <ErrorMessage message={error} />
            <Input name="email" placeholder={PLACEHOLDER_EMAIL} onChange={() => resetError()} />
            <Input type="password" name="password" placeholder={PLACEHOLDER_PASSWORD} onChange={() => resetError()} />
            <Button isLoading={isLoading} btnText={BUTTON_LOGIN} />
        </Form>
    );
}
