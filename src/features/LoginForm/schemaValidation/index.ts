import { z } from "zod";
import {
    ERROR_EMPTY_EMAIL,
    ERROR_EMPTY_PASSWORD,
    ERROR_INVALID_EMAIL,
    ERROR_INVALID_PASSWORD,
    REGEX_PASSWORD_VALIDATION,
} from "@/constants";

export const validateSchema = z.object({
    email: z
        .string()
        .nonempty(ERROR_EMPTY_EMAIL)
        .email({
            message: ERROR_INVALID_EMAIL,
        })
        .trim(),
    password: z.string().nonempty(ERROR_EMPTY_PASSWORD).regex(REGEX_PASSWORD_VALIDATION, {
        message: ERROR_INVALID_PASSWORD,
    }),
});
