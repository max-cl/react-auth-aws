import { z } from "zod";
import { ERROR_EMPTY_EMAIL, ERROR_EMPTY_PASSWORD, ERROR_INVALID_EMAIL, ERROR_INVALID_PASSWORD } from "@/constants";

const PasswordRequirementsRegex =
    /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[\^$*.\[\]{}()?!"@#%&/\\,><':;|_~`+=\-]).{8,}$/;

export const validateSchema = z.object({
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
});
