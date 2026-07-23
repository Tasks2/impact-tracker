import { getProjectReport } from "../services/report.service.js";
import { Request, Response } from "express";

// export async function getProjectReportHandler(req: Request, res: Response) {
//   const report = await getProjectReport(req.params.id);

//   res.json({
//     success: true,
//     data: report
//   });
// }

export async function getProjectReportHandler(
  req: Request,
  res: Response
) {
  const id = Array.isArray(req.params.id)
    ? req.params.id[0]
    : req.params.id;

  const report = await getProjectReport(id);

  res.status(200).json({
    success: true,
    data: report,
  });
}