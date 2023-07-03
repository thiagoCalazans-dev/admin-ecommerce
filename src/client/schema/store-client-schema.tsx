import z from "zod";

export const storeSchema = z.object({
  id: z.string().uuid().nonempty(),
  name: z.string().nonempty(),
  userId: z.string().nonempty(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const createStoreSchema = z.object({
  name: z.string().nonempty(),
});

export const deleteStoreSchema = z.object({
  id: z.string().uuid().nonempty(),
});

export const updateStoreSchema = z.object({
  id: z.string().uuid().nonempty(),
  name: z.string().nonempty(),
});

export const serverResponseSchema = z.object({
  id: z.string().uuid().nonempty(),
  name: z.string().nonempty(),
  userId: z.string().nonempty(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const serverResponseListSchema = z.object({
  store: z.array(storeSchema),
});
