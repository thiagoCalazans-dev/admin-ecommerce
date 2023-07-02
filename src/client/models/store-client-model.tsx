import z from "zod";
import {
  StoreSchema,
  createStoreSchema,
} from "@/client/schema/store-client-schema";

export type Store = z.infer<typeof StoreSchema>;

export type CreateStore = z.infer<typeof createStoreSchema>;