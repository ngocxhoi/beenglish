export const useAuth = () => {
  return useState<UserType | null>('auth-user', () => null)
}
