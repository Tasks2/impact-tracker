import prisma from '../config/prisma.js';
import bcrypt from 'bcrypt';
import jwt, {SignOptions} from 'jsonwebtoken';
import { LoginInput } from '../types/auth.schema.js';

export async function login(data: LoginInput) {
  // Find user by email
  const user = await prisma.user.findUnique({
    where: { email: data.email }
  });

  if (!user) {
    throw new Error('Invalid email or password');
  }

  // Compare password
  const isValidPassword = await bcrypt.compare(
    data.password,
    user.passwordHash
  );

  if (!isValidPassword) {
    throw new Error('Invalid email or password');
  }

  // Generate JWT
//   const token = jwt.sign(
//     {
//       userId: user.id,
//       email: user.email,
//       role: user.role
//     },
//     process.env.JWT_SECRET!,
//     {
//       expiresIn: process.env.JWT_EXPIRES_IN || '1d'
//     }
//   );

const jwtOptions: SignOptions = {
  expiresIn: process.env.JWT_EXPIRES_IN || '1d'
};

const token = jwt.sign(
  {
    userId: user.id,
    email: user.email,
    role: user.role
  },
  process.env.JWT_SECRET as string,
  jwtOptions
);

  // Return safe user object
  return {
    token,
    user: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      status: user.status
    }
  };
}