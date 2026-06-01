export interface User {
  id: string
  email: string
  exp: number
}

export const useAuth = () => {
  return useState<User | null>('auth-user', () => null)
}
