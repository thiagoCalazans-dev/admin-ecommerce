import z from "zod";

export const BillboardCreateSchema = z.object({
  label: z.string().nonempty(),
  imageUrl: z.string().nonempty().url(),
  storeId: z.string().nonempty().uuid(),
});

export const BillboardSchema = z.object({
  id: z.string().uuid().nonempty(),
  label: z.string().nonempty(),
  imageUrl: z.string().nonempty().url(),
  storeId: z.string().nonempty().uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const BillboardDeleteByIdSchema = z.object({
  id: z.string().uuid().nonempty(),
});

export const BillboardUpdateByIdSchema = z.object({
  id: z.string().uuid().nonempty(),
  label: z.string().nonempty(),
  imageUrl: z.string().nonempty().url(),
  storeId: z.string().nonempty().uuid(),
});
