import { z } from "zod";
import { ERROR_EMPTY_EMAIL, ERROR_INVALID_EMAIL } from "@/constants";

export const validateSchema = z.object({
    email: z
        .string()
        .nonempty(ERROR_EMPTY_EMAIL)
        .email({
            message: ERROR_INVALID_EMAIL,
        })
        .trim(),
});
