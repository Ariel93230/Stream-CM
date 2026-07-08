export function authView(user: { id: string; email: string; role: string; token: string }) {
  return {
    id: user.id,
    email: user.email,
    role: user.role,
    token: user.token,
  };
}
