import { z } from 'zod';

export const ConversationSchema = z
  .object({
    text: z.string().min(1).optional(),
    user_name: z.string().min(1).optional(),
  })
  .strict();

export type TConversation = z.infer<typeof ConversationSchema>;