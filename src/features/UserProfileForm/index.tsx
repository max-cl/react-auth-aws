import { useState } from "react";

import { useAuth } from "@/hooks/useAuth";
import Form from "@/components/common/Form";
import ErrorMessage from "@/components/common/ErrorMessage";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { toast } from "react-hot-toast";
import {
    BUTTON_UPDATE_USER_ATTRIBUTES,
    ERROR_EMPTY_FIELDS,
    ERROR_UPDATE_USER_ATTRIBUTES,
    PLACEHOLDER_FIRSTNAME,
    PLACEHOLDER_LASTNAME,
    ROUTE_TO_HOME,
    SUCCESS_UPDATE_USER_ATTRIBUTES,
} from "@/constants";
import { useNavigate } from "react-router-dom";
import Badge from "@/components/common/Badge";

interface InputsValidation {
    firstName: string;
    lastName: string;
}

export default function UserProfileForm() {
    const { updateUserAttributes, isLoading, setIsLoading, error, setError, resetError, userAttributes } = useAuth();
    const [email] = useState(userAttributes?.email ?? "");
    const [firstName, setFirstName] = useState(userAttributes?.given_name ?? "");
    const [lastName, setLastName] = useState(userAttributes?.family_name ?? "");
    const navigate = useNavigate();

    function inputsValidationUtil({ firstName, lastName }: InputsValidation) {
        if (firstName.length === 0 || lastName.length === 0) {
            setError(ERROR_EMPTY_FIELDS);
            setIsLoading(false);
            return false;
        }

        return true;
    }

    async function handleUserProfile(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);

        if (!inputsValidationUtil({ firstName, lastName })) {
            return;
        }

        try {
            const response = await updateUserAttributes({ given_name: firstName, family_name: lastName });
            if (response === "SUCCESS") {
                toast.success(SUCCESS_UPDATE_USER_ATTRIBUTES);
                setError("");
                resetInputs();
                navigate(ROUTE_TO_HOME);
            } else {
                toast.error(ERROR_UPDATE_USER_ATTRIBUTES);
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

    function onChangeFirstName(e: React.ChangeEvent<HTMLInputElement>) {
        if (error !== null) {
            resetError();
        }

        setFirstName(e.target.value.trim());
    }

    function onChangeLastName(e: React.ChangeEvent<HTMLInputElement>) {
        if (error !== null) {
            resetError();
        }

        setLastName(e.target.value.trim());
    }

    function resetInputs() {
        setFirstName("");
        setLastName("");
    }

    return (
        <Form onSubmit={handleUserProfile}>
            <ErrorMessage message={error} />
            <Badge badgeText={email} />
            <Input placeholder={PLACEHOLDER_FIRSTNAME} onChange={onChangeFirstName} value={firstName} />
            <Input placeholder={PLACEHOLDER_LASTNAME} onChange={onChangeLastName} value={lastName} />
            <Button isLoading={isLoading} btnText={BUTTON_UPDATE_USER_ATTRIBUTES} />
        </Form>
    );
}
