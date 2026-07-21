import { Request, Response } from 'express';
import { loginSchema } from '../types/auth.schema.js';
import { login } from '../services/auth.service.js';

export async function loginHandler(
  req: Request,
  res: Response
) {
  const validation = loginSchema.safeParse(req.body);

  if (!validation.success) {
    return res.status(400).json({
      success: false,
      errors: validation.error.flatten()
    });
  }

  try {
    const result = await login(validation.data);

    return res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid email or password'
    });
  }
}