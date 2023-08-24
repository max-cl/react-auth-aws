import { z } from "zod";

import { useAuth } from "@/hooks/useAuth";
import Form from "@/components/common/Form";
import ErrorMessage from "@/components/common/ErrorMessage";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { toast } from "react-hot-toast";
import {
    BUTTON_CHANGE_PASSWORD,
    ERROR_CHANGE_USER_PASSWORD,
    PLACEHOLDER_OLD_PASSWORD,
    PLACEHOLDER_PASSWORD,
    PLACEHOLDER_REPASSWORD,
    ROUTE_TO_HOME,
    SUCCESS_CHANGE_PASSWORD,
} from "@/constants";
import Badge from "@/components/common/Badge";
import { useNavigate } from "react-router-dom";
import { validateSchema } from "./schemaValidation";

export default function ChangeUserPasswordForm() {
    const { changeUserPassword, isLoading, setIsLoading, error, setError, resetError, userAttributes } = useAuth();
    const navigate = useNavigate();

    async function handleChangeUserPassword(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);

        const formData = new FormData(event.target as HTMLFormElement);
        const data = Object.fromEntries(formData);

        try {
            const { oldPassword, newPassword } = validateSchema.parse(data);
            const response = await changeUserPassword({ oldPassword, newPassword });
            if (response === "SUCCESS") {
                toast.success(SUCCESS_CHANGE_PASSWORD);
                setError(null);
                navigate(ROUTE_TO_HOME);
            } else {
                toast.error(ERROR_CHANGE_USER_PASSWORD);
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
        <Form onSubmit={handleChangeUserPassword}>
            <ErrorMessage message={error} />
            <Badge badgeText={userAttributes?.email ?? ""} />
            <Input
                type="password"
                placeholder={PLACEHOLDER_OLD_PASSWORD}
                onChange={() => resetError()}
                name="oldPassword"
            />
            <Input
                type="password"
                placeholder={PLACEHOLDER_PASSWORD}
                onChange={() => resetError()}
                name="newPassword"
            />
            <Input
                type="password"
                placeholder={PLACEHOLDER_REPASSWORD}
                onChange={() => resetError()}
                name="confirmNewPassword"
            />
            <Button isLoading={isLoading} btnText={BUTTON_CHANGE_PASSWORD} />
        </Form>
    );
}
