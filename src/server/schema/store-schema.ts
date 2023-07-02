import z, { string } from "zod";

export const StoreCreateSchema = z.object({
  name: z.string().nonempty(),
  userId: z.string().nonempty(),
});

export const StoreUpdateByIdSchema = z.object({
  id: z.string().nonempty().uuid(),
  name: z.string().nonempty(),
  userId: z.string().nonempty(),
});

export const StoreDeleteByIdSchema = z.object({
  id: z.string().nonempty().uuid(), 
  userId: z.string().nonempty(),
});

export const StoreSchema = z.object({
  id: z.string().uuid().nonempty(),
  name: z.string().nonempty(),
  userId: z.string().nonempty(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const userIdStoreSchema = z.string().nonempty();