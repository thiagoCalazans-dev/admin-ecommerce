import z from "zod";
import {
  BillboardCreateSchema,
  BillboardDeleteByIdSchema,
  BillboardSchema,
  BillboardUpdateByIdSchema,
} from "@/server/schema/billboard-schema";

export type CreateBillboard = z.infer<typeof BillboardCreateSchema>;

export type UpdateBillboard = z.infer<typeof BillboardUpdateByIdSchema>;
export type DeleteBillboard = z.infer<typeof BillboardDeleteByIdSchema>;

export type Billboard = z.infer<typeof BillboardSchema>;

export const userIdBillboardSchema = z.string().nonempty();
