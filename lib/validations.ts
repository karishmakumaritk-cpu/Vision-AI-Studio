import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8)
});

export const generateSchema = z.object({
  prompt: z.string().min(3),
  toolType: z.enum(['text-generator', 'image-prompt', 'business-idea', 'marketing-copy'])
});
