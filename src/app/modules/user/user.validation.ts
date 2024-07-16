import { z } from "zod";

const UserSchemaValidation=z.object({

    password: z.string({invalid_type_error:'password must be string!'})
    .max(20,{message:'password should not be more than 20'})
    .optional(),
  
})
export const UserValidation={
    UserSchemaValidation
}