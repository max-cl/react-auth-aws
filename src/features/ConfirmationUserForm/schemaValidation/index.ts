import { z } from "zod";
import { ERROR_EMPTY_CONFIRMATION_CODE } from "@/constants";

export const validateSchema = z.object({
    code: z.string().nonempty(ERROR_EMPTY_CONFIRMATION_CODE),
});
