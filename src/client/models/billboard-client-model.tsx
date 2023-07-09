import z from "zod";
import {
  billboardSchema,
  createBillboardSchema,
  deleteBillboardSchema,
  getBillboardSchema,
  serverResponseBillboardSchema,
  updateBillboardSchema,
} from "@/client/schema/billboard-client-schema";

export type Billboard = z.infer<typeof billboardSchema>;

export type CreateBillboard = z.infer<typeof createBillboardSchema>;

export type UpdateBillboard = z.infer<typeof updateBillboardSchema>;

export type ServerReponseBillboard = z.infer<
  typeof serverResponseBillboardSchema
>;

export type DeleteBillboard = z.infer<typeof deleteBillboardSchema>;

export type GetBillboard = z.infer<typeof getBillboardSchema>;

