import { z } from "zod";
import {
    ERROR_EMPTY_CONFIRM_PASSWORD,
    ERROR_EMPTY_EMAIL,
    ERROR_EMPTY_FIRSTNAME,
    ERROR_EMPTY_LASTNAME,
    ERROR_EMPTY_PASSWORD,
    ERROR_INVALID_CONFIRM_PASSWORD,
    ERROR_INVALID_EMAIL,
    ERROR_INVALID_PASSWORD,
    ERROR_PASSWORDS_NOT_MATCH,
} from "@/constants";

const PasswordRequirementsRegex =
    /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[\^$*.\[\]{}()?!"@#%&/\\,><':;|_~`+=\-]).{8,}$/;

export const validateSchema = z
    .object({
        firstName: z.string().nonempty(ERROR_EMPTY_FIRSTNAME),
        lastName: z.string().nonempty(ERROR_EMPTY_LASTNAME),
        email: z
            .string()
            .nonempty(ERROR_EMPTY_EMAIL)
            .email({
                message: ERROR_INVALID_EMAIL,
            })
            .trim(),
        password: z.string().nonempty(ERROR_EMPTY_PASSWORD).regex(PasswordRequirementsRegex, {
            message: ERROR_INVALID_PASSWORD,
        }),
        confirmPassword: z.string().nonempty(ERROR_EMPTY_CONFIRM_PASSWORD).regex(PasswordRequirementsRegex, {
            message: ERROR_INVALID_CONFIRM_PASSWORD,
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: ERROR_PASSWORDS_NOT_MATCH,
        path: ["confirmpassword"],
    });
