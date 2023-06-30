import z from "zod";

export const StoreCreateBodySchema = z.object({
  name: z.string().nonempty(),
});

export const StoreSchema = z.object({
  id: z.string().uuid().nonempty(),
  name: z.string().nonempty(),
  userId: z.string().nonempty(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const userIdStoreSchema = z.string().nonempty();