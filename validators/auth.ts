import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('error_email_invalid'),
  password: z.string().min(6, 'error_password_min'),
  rememberMe: z.boolean().optional()
})

export const registerSchema = z
  .object({
    username: z.string().min(1, 'error_required'),
    email: z.string().email('error_email_invalid'),
    password: z.string().min(6, 'error_password_min'),
    confirmPassword: z.string().min(6, 'error_password_min'),
    terms: z.boolean().refine((val) => val === true, 'error_required')
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'error_password_match',
    path: ['confirmPassword']
  })

export type LoginInput = z.infer<typeof loginSchema>
export type RegisterInput = z.infer<typeof registerSchema>
