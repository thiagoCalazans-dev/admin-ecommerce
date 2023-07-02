import z from "zod";

export const StoreSchema = z.object({
  id: z.string().uuid().nonempty(),
  name: z.string().nonempty(),
  userId: z.string().nonempty(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const createStoreSchema = z.object({
  name: z.string().nonempty(),
});

export const updateStoreSchema = z.object({
  id: z.string().uuid().nonempty(),
  name: z.string().nonempty(),
});

export const ServerResponseSchema = z.object({
  id: z.string().uuid().nonempty(),
  name: z.string().nonempty(),
  userId: z.string().nonempty(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const ServerResponseListSchema = z.object({
  store: z.array(StoreSchema),
});
