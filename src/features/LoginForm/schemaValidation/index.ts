import { z } from "zod";
import { ERROR_EMPTY_EMAIL, ERROR_EMPTY_PASSWORD, ERROR_INVALID_EMAIL, ERROR_INVALID_PASSWORD } from "@/constants";

const PasswordRequirementsRegex =
    /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[\^$*.\[\]{}()?!"@#%&/\\,><':;|_~`+=\-]).{8,}$/;

export const validateSchema = z.object({
    email: z
        .string()
        .email({
            message: ERROR_INVALID_EMAIL,
        })
        .nonempty(ERROR_EMPTY_EMAIL)
        .trim(),
    password: z
        .string()
        .regex(PasswordRequirementsRegex, {
            message: ERROR_INVALID_PASSWORD,
        })
        .nonempty(ERROR_EMPTY_PASSWORD),
});
