import { z } from "zod";
import { ERROR_EMPTY_FIRSTNAME, ERROR_EMPTY_LASTNAME } from "@/constants";

export const validateSchema = z.object({
    firstName: z.string().nonempty(ERROR_EMPTY_FIRSTNAME),
    lastName: z.string().nonempty(ERROR_EMPTY_LASTNAME),
});
