import { Response, Request } from "express";
import { getAllVolunteers, createVolunteer, updateVolunteer, deleteVolunteer  } from "../services/volunteer.service.js";
import {createVolunteerSchema, updateVolunteerSchema  } from "../types/volunteer.schema.js";

export async function getVolunteers(req:Request, res: Response){
       try{
            const search =
      typeof req.query.search === 'string'
        ? req.query.search
        : undefined;
    
    const volunteers = await getAllVolunteers(search);
     res.status(200).json({
          success: true,
          data: volunteers
        });
        } catch (error) {
        console.error('Error fetching volunteers:', error);
    
        res.status(500).json({
          success: false,
          message: 'Failed to fetch volunteers'
        });
      }
}

export async function createVolunteerHandler(req:Request, res:Response){
    const validation = createVolunteerSchema.safeParse(req.body);

    if(!validation.success){
        return res.status(400).json({
      success: false,
      errors: validation.error.flatten()
    });
    }

    const volunteer = await createVolunteer(validation.data);

    return res.status(201).json({
    success: true,
    data: volunteer
  });

}


export async function updateVolunteerHandler(
  req: Request,
  res: Response
) {
  const id = Array.isArray(req.params.id)
    ? req.params.id[0]
    : req.params.id;

  const validation = updateVolunteerSchema.safeParse(req.body);

  if (!validation.success) {
    return res.status(400).json({
      success: false,
      errors: validation.error.flatten()
    });
  }

  const volunteer = await updateVolunteer(id, validation.data);

  return res.status(200).json({
    success: true,
    data: volunteer
  });
}


export async function deleteVolunteerHandler(
  req: Request,
  res: Response
) {
    const id = Array.isArray(req.params.id)
  ? req.params.id[0]
  : req.params.id;

await deleteVolunteer(id);

  res.status(200).json({
    success: true,
    message: 'Volunteer deleted successfully'
  });
}