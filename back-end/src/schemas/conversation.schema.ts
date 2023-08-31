import { z } from 'zod';

export const ConversationSchema = z
  .object({
    text: z.string().min(1),
  })
  .strict();

export type TConversation = z.infer<typeof ConversationSchema>;