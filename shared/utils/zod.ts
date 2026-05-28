import * as z from 'zod'

const schemaLogin = z.object({
  email: z.email('Invalid email'),
  password: z.string('Password is required').min(8, 'Must be at least 8 characters')
})

type SchemaLogin = z.output<typeof schemaLogin>

const schemaSignup = z.object({
  email: z.email('Invalid email'),
  password: z.string('Password is required').min(8, 'Must be at least 8 characters'),
  confirmPassword: z.string('Confirm password is required').min(8, 'Must be at least 8 characters')
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword']
})

type SchemaSignup = z.output<typeof schemaSignup>

export { schemaLogin, SchemaLogin, schemaSignup, SchemaSignup }
