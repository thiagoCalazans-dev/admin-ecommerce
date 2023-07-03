import z from "zod";
import {
  billboardSchema,
  createBillboardSchema,
  serverResponseBillboardSchema,
} from "@/client/schema/billboard-client-schema";

export type Billboard = z.infer<typeof billboardSchema>;

export type CreateBillboard = z.infer<typeof createBillboardSchema>;

export type ServerReponseBillboardCreate = z.infer<
  typeof serverResponseBillboardSchema
>;
