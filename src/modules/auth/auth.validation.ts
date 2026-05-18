import { z } from 'zod';

export const signupSchema = z.object({
    body: z.object({
        email: z.string().email('Invalid email format'),
        password: z
            .string()
            .min(8, 'Password must be at least 8 characters')
            .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
            .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
            .regex(/[0-9]/, 'Password must contain at least one number'),
        username: z.string().min(2, 'Name must be at least 2 characters'),
    }),
});

export const loginSchema = z.object({
    body: z.object({
        email: z.string().email('Invalid email format'),
        password: z.string().min(1, 'Password is required'),
    }),
});

export const requestOtpSchema = z.object({
    body: z.object({
        email: z.string().email('Invalid email format'),
    }),
});

// Export types for use in controllers
export type SignupInput = z.infer<typeof signupSchema>['body'];
export type LoginInput = z.infer<typeof loginSchema>['body'];
export type RequestOtpInput = z.infer<typeof requestOtpSchema>['body'];