import { z } from "zod";
import {
    ERROR_EMPTY_CONFIRM_NEW_PASSWORD,
    ERROR_EMPTY_NEW_PASSWORD,
    ERROR_EMPTY_OLD_PASSWORD,
    ERROR_INVALID_CONFIRM_PASSWORD,
    ERROR_INVALID_PASSWORD,
    ERROR_PASSWORDS_NOT_MATCH,
} from "@/constants";

const PasswordRequirementsRegex =
    /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[\^$*.\[\]{}()?!"@#%&/\\,><':;|_~`+=\-]).{8,}$/;

export const validateSchema = z
    .object({
        oldPassword: z.string().nonempty(ERROR_EMPTY_OLD_PASSWORD).regex(PasswordRequirementsRegex, {
            message: ERROR_INVALID_PASSWORD,
        }),
        newPassword: z.string().nonempty(ERROR_EMPTY_NEW_PASSWORD).regex(PasswordRequirementsRegex, {
            message: ERROR_INVALID_PASSWORD,
        }),
        confirmNewPassword: z.string().nonempty(ERROR_EMPTY_CONFIRM_NEW_PASSWORD).regex(PasswordRequirementsRegex, {
            message: ERROR_INVALID_CONFIRM_PASSWORD,
        }),
    })
    .refine((data) => data.newPassword === data.confirmNewPassword, {
        message: ERROR_PASSWORDS_NOT_MATCH,
        path: ["confirmpassword"],
    });
