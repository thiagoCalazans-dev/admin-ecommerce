import z from "zod"
import { StoreSchema } from "../schema/store-schema";

export interface CreateStore {
  name: string;
  userId: string;
}

export type Store = z.infer<typeof StoreSchema>;
