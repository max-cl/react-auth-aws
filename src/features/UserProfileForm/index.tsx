import { z } from "zod";

import { useAuth } from "@/hooks/useAuth";
import Form from "@/components/common/Form";
import ErrorMessage from "@/components/common/ErrorMessage";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { toast } from "react-hot-toast";
import {
    BUTTON_UPDATE_USER_ATTRIBUTES,
    ERROR_UPDATE_USER_ATTRIBUTES,
    PLACEHOLDER_FIRSTNAME,
    PLACEHOLDER_LASTNAME,
    ROUTE_TO_HOME,
    SUCCESS_UPDATE_USER_ATTRIBUTES,
} from "@/constants";
import { useNavigate } from "react-router-dom";
import Badge from "@/components/common/Badge";
import { validateSchema } from "./schemaValidation";

export default function UserProfileForm() {
    const { updateUserAttributes, isLoading, setIsLoading, error, setError, resetError, userAttributes } = useAuth();
    const navigate = useNavigate();

    async function handleUserProfile(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);

        const formData = new FormData(event.target as HTMLFormElement);
        const data = Object.fromEntries(formData);

        try {
            const { firstName, lastName } = validateSchema.parse(data);
            const response = await updateUserAttributes({ given_name: firstName, family_name: lastName });
            if (response === "SUCCESS") {
                toast.success(SUCCESS_UPDATE_USER_ATTRIBUTES);
                resetError();
                navigate(ROUTE_TO_HOME);
            } else {
                toast.error(ERROR_UPDATE_USER_ATTRIBUTES);
                if (import.meta.env.VITE_ENVIRONMENT === "development") {
                    console.log("[ERROR] Unexpected result: ", JSON.parse(JSON.stringify(response)));
                }
            }
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
        <Form onSubmit={handleUserProfile}>
            <ErrorMessage message={error} />
            <Badge badgeText={userAttributes?.email ?? ""} />
            <Input
                placeholder={PLACEHOLDER_FIRSTNAME}
                onChange={() => resetError()}
                name="firstName"
                defaultValue={userAttributes?.given_name ?? ""}
            />
            <Input
                placeholder={PLACEHOLDER_LASTNAME}
                onChange={() => resetError()}
                name="lastName"
                defaultValue={userAttributes?.family_name ?? ""}
            />
            <Button isLoading={isLoading} btnText={BUTTON_UPDATE_USER_ATTRIBUTES} />
        </Form>
    );
}
