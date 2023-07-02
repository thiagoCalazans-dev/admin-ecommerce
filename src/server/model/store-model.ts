import z from "zod";
import {
  StoreCreateSchema,
  StoreDeleteByIdSchema,
  StoreSchema,
  StoreUpdateByIdSchema,
} from "@/server/schema/store-schema";

export type CreateStore = z.infer<typeof StoreCreateSchema>;

export type UpdateStore = z.infer<typeof StoreUpdateByIdSchema>;
export type DeleteStore = z.infer<typeof StoreDeleteByIdSchema>;

export type Store = z.infer<typeof StoreSchema>;

export const userIdStoreSchema = z.string().nonempty();
