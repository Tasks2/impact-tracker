import { Request, Response } from 'express';
import {getAllUsers,getUserById,getUserAssignments} from '../services/user.service.js';

function getId(req: Request) {
  return Array.isArray(req.params.id)
    ? req.params.id[0]
    : req.params.id;
}

export async function getUsers(_req: Request, res: Response) {
  const users = await getAllUsers();

  return res.status(200).json({
    success: true,
    data: users
  });
}

export async function getUser(req: Request, res: Response) {
  const user = await getUserById(getId(req));

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }

  return res.status(200).json({
    success: true,
    data: user
  });
}

export async function getAssignments(
  req: Request,
  res: Response
) {
  const assignments = await getUserAssignments(getId(req));

  return res.status(200).json({
    success: true,
    data: assignments
  });
}