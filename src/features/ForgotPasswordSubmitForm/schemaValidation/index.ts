import { z } from "zod";
import {
    ERROR_EMPTY_CONFIRMATION_CODE,
    ERROR_EMPTY_CONFIRM_PASSWORD,
    ERROR_EMPTY_PASSWORD,
    ERROR_INVALID_CONFIRM_PASSWORD,
    ERROR_INVALID_PASSWORD,
    ERROR_PASSWORDS_NOT_MATCH,
    REGEX_PASSWORD_VALIDATION,
} from "@/constants";

export const validateSchema = z
    .object({
        password: z.string().nonempty(ERROR_EMPTY_PASSWORD).regex(REGEX_PASSWORD_VALIDATION, {
            message: ERROR_INVALID_PASSWORD,
        }),
        confirmPassword: z.string().nonempty(ERROR_EMPTY_CONFIRM_PASSWORD).regex(REGEX_PASSWORD_VALIDATION, {
            message: ERROR_INVALID_CONFIRM_PASSWORD,
        }),
        code: z.string().nonempty(ERROR_EMPTY_CONFIRMATION_CODE),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: ERROR_PASSWORDS_NOT_MATCH,
        path: ["confirmpassword"],
    });
