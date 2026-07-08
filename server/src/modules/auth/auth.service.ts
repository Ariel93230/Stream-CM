import prisma from '../../config/db.js';

interface LoginInput {
  email: string;
  password: string;
}

export async function loginUser(input: LoginInput) {
  const user = await prisma.user.findUnique({
    where: { email: input.email },
  });

  if (!user) {
    throw new Error('Invalid credentials');
  }

  // STANDARDS: placeholder auth logic. Replace with password hashing and JWT once user auth is implemented.
  return {
    id: user.id,
    email: user.email,
    role: user.role,
    token: 'mock-token',
  };
}
