import { useRef } from "react";
import { z } from "zod";

import { useAuth } from "@/hooks/useAuth";
import Form from "@/components/common/Form";
import ErrorMessage from "@/components/common/ErrorMessage";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { toast } from "react-hot-toast";
import {
    BUTTON_SIGNUP,
    PLACEHOLDER_EMAIL,
    PLACEHOLDER_FIRSTNAME,
    PLACEHOLDER_LASTNAME,
    PLACEHOLDER_PASSWORD,
    PLACEHOLDER_REPASSWORD,
    SUCCESS_SIGNUP,
} from "@/constants";
import { validateSchema } from "./schemaValidation";

interface Props {
    setIsLoginForm: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SignupForm({ setIsLoginForm }: Props) {
    const { signUp, isLoading, setIsLoading, error, setError, resetError } = useAuth();
    const formRef = useRef<HTMLFormElement>(null);

    async function handleSignUp(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);

        if (!formRef.current) {
            return;
        }

        const formData = new FormData(formRef.current);
        const data = Object.fromEntries(formData);

        try {
            const { firstName, lastName, email, password } = validateSchema.parse(data);
            await signUp({ given_name: firstName, family_name: lastName, email, password });
            toast.success(SUCCESS_SIGNUP);
            resetError();
            setIsLoginForm(true);
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
        <Form ref={formRef} onSubmit={handleSignUp} cssCustom="rounded-tr-none">
            <ErrorMessage message={error} />
            <Input placeholder={PLACEHOLDER_FIRSTNAME} onChange={() => resetError()} name="firstName" />
            <Input placeholder={PLACEHOLDER_LASTNAME} onChange={() => resetError()} name="lastName" />
            <Input placeholder={PLACEHOLDER_EMAIL} onChange={() => resetError()} name="email" />
            <Input type="password" placeholder={PLACEHOLDER_PASSWORD} onChange={() => resetError()} name="password" />
            <Input
                type="password"
                placeholder={PLACEHOLDER_REPASSWORD}
                onChange={() => resetError()}
                name="confirmPassword"
            />
            <Button isLoading={isLoading} btnText={BUTTON_SIGNUP} />
        </Form>
    );
}
