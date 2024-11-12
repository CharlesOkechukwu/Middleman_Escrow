import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { z } from 'zod';


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const authFormSchema = z.object({
  fullName: z.string().min(4).optional(),
  email: z.string().email(),
  password: z.string().min(8),
  confirmPassword: z.string().min(8).optional()
})