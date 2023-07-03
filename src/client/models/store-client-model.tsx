import z from "zod";
import {
  storeSchema,
  createStoreSchema,
  deleteStoreSchema,
  updateStoreSchema,
} from "@/client/schema/store-client-schema";

export type Store = z.infer<typeof storeSchema>;

export type CreateStore = z.infer<typeof createStoreSchema>;

export type UpdateStore = z.infer<typeof updateStoreSchema>;

export type DeleteStore = z.infer<typeof deleteStoreSchema>;
