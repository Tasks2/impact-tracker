import { Request, Response } from "express";
import { getAllBeneficiaries, createBeneficiary, updateBeneficiary, deleteBeneficiary } from "../services/beneficiary.service.js";
import { createBeneficiarySchema, updateBeneficiarySchema } from "../types/beneficiary.schema.js";


export async function getBeneficiaries(req:Request, res:Response) {
    try{
        const search =
  typeof req.query.search === 'string'
    ? req.query.search
    : undefined;

const beneficiaries = await getAllBeneficiaries(search);
 res.status(200).json({
      success: true,
      data: beneficiaries
    });
    } catch (error) {
    console.error('Error fetching beneficiaries:', error);

    res.status(500).json({
      success: false,
      message: 'Failed to fetch beneficiaries'
    });
  }
}

export async function createBeneficiaryHandler(req:Request, res:Response){
    const validation = createBeneficiarySchema.safeParse(req.body);

    if(!validation.success){
        return res.status(400).json({
      success: false,
      errors: validation.error.flatten()
    });
    }

    const beneficiary = await createBeneficiary(validation.data);

    return res.status(201).json({
    success: true,
    data: beneficiary
  });

}

export async function updateBeneficiaryHandler(
  req: Request,
  res: Response
) {
  const id = Array.isArray(req.params.id)
    ? req.params.id[0]
    : req.params.id;

  const validation = updateBeneficiarySchema.safeParse(req.body);

  if (!validation.success) {
    return res.status(400).json({
      success: false,
      errors: validation.error.flatten()
    });
  }

  const beneficiary = await updateBeneficiary(id, validation.data);

  return res.status(200).json({
    success: true,
    data: beneficiary
  });
}


export async function deleteBeneficiaryHandler(
  req: Request,
  res: Response
) {
    const id = Array.isArray(req.params.id)
  ? req.params.id[0]
  : req.params.id;

await deleteBeneficiary(id);

  res.status(200).json({
    success: true,
    message: 'Beneficiary deleted successfully'
  });
}