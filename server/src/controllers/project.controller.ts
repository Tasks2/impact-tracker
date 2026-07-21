import { Request, Response } from 'express';
import { getAllProjects } from '../services/project.service.js';
import { createProjectSchema, updateProjectSchema } from '../types/project.schema.js';
import { createProject, updateProject, deleteProject } from '../services/project.service.js';

export async function getProjects(_req: Request, res: Response) {
  try {
    const projects = await getAllProjects();

    res.status(200).json({
      success: true,
      data: projects
    });
  } catch (error) {
    console.error('Error fetching projects:', error);

    res.status(500).json({
      success: false,
      message: 'Failed to fetch projects'
    });
  }
}



export async function createProjectHandler(
  req: Request,
  res: Response
) {
  const validation = createProjectSchema.safeParse(req.body);

  if (!validation.success) {
    return res.status(400).json({
      success: false,
      errors: validation.error.flatten()
    });
  }

  const project = await createProject(validation.data);

  return res.status(201).json({
    success: true,
    data: project
  });
}

export async function updateProjectHandler(
  req: Request,
  res: Response
) {
  const id = Array.isArray(req.params.id)
    ? req.params.id[0]
    : req.params.id;

  const validation = updateProjectSchema.safeParse(req.body);

  if (!validation.success) {
    return res.status(400).json({
      success: false,
      errors: validation.error.flatten()
    });
  }

  const project = await updateProject(id, validation.data);

  return res.status(200).json({
    success: true,
    data: project
  });
}


export async function deleteProjectHandler(
  req: Request,
  res: Response
) {
    const id = Array.isArray(req.params.id)
  ? req.params.id[0]
  : req.params.id;

await deleteProject(id);

  res.status(200).json({
    success: true,
    message: 'Project deleted successfully'
  });
}