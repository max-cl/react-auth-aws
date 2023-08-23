import { useState } from "react";

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
    ERROR_EMPTY_FIELDS,
    ERROR_PASSWORDS_NOT_MATCH,
    PLACEHOLDER_OLD_PASSWORD,
    PLACEHOLDER_PASSWORD,
    PLACEHOLDER_REPASSWORD,
    ROUTE_TO_HOME,
    SUCCESS_CHANGE_PASSWORD,
} from "@/constants";
import Badge from "@/components/common/Badge";
import { useNavigate } from "react-router-dom";

interface InputsValidation {
    password: string;
    repassword: string;
}

export default function ChangeUserPasswordForm() {
    const { changeUserPassword, isLoading, setIsLoading, error, setError, resetError, userAttributes } = useAuth();
    const [email] = useState(userAttributes?.email ?? "");
    const [oldPassword, setOldPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [newRePassword, setNewRePassword] = useState<string>("");
    const navigate = useNavigate();

    function inputsValidationUtil({ password, repassword }: InputsValidation) {
        if (password.trim().length === 0 || repassword.trim().length === 0) {
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

    async function handleChangeUserPassword(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);

        if (!inputsValidationUtil({ password: newPassword, repassword: newRePassword })) {
            return;
        }

        try {
            const response = await changeUserPassword({ oldPassword, newPassword });
            if (response === "SUCCESS") {
                toast.success(SUCCESS_CHANGE_PASSWORD);
                setError("");
                resetInputs();
                navigate(ROUTE_TO_HOME);
            } else {
                toast.error(ERROR_CHANGE_USER_PASSWORD);
                if (import.meta.env.VITE_ENVIRONMENT === "development") {
                    console.log("[ERROR] Unexpected result: ", JSON.parse(JSON.stringify(response)));
                }
            }
        } catch (error) {
            const errorMessage = getErrorMessage(error);
            setError(errorMessage);
        }
        setIsLoading(false);
    }

    function onChangeOldPassword(e: React.ChangeEvent<HTMLInputElement>) {
        if (error !== null) {
            resetError();
        }

        setOldPassword(e.target.value);
    }

    function onChangeNewPassword(e: React.ChangeEvent<HTMLInputElement>) {
        if (error !== null) {
            resetError();
        }

        setNewPassword(e.target.value);
    }

    function onChangeNewRePassword(e: React.ChangeEvent<HTMLInputElement>) {
        if (error !== null) {
            resetError();
        }

        setNewRePassword(e.target.value);
    }

    function resetInputs() {
        setOldPassword("");
        setNewPassword("");
        setNewRePassword("");
    }

    return (
        <Form onSubmit={handleChangeUserPassword}>
            <ErrorMessage message={error} />
            <Badge badgeText={email} />
            <Input
                type="password"
                placeholder={PLACEHOLDER_OLD_PASSWORD}
                onChange={onChangeOldPassword}
                value={oldPassword}
            />
            <Input
                type="password"
                placeholder={PLACEHOLDER_PASSWORD}
                onChange={onChangeNewPassword}
                value={newPassword}
            />
            <Input
                type="password"
                placeholder={PLACEHOLDER_REPASSWORD}
                onChange={onChangeNewRePassword}
                value={newRePassword}
            />
            <Button isLoading={isLoading} btnText={BUTTON_CHANGE_PASSWORD} />
        </Form>
    );
}
