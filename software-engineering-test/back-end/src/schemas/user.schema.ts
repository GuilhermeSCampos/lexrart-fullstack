import { z } from 'zod';

export const UserSchema = z
  .object({
    user_name: z.string().min(1),
    password: z.string().min(5),
  })
  .strict();

export type TUser = z.infer<typeof UserSchema>;