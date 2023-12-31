import z from "zod";

export const billboardSchema = z.object({
  id: z.string().uuid().nonempty(),
  label: z.string().nonempty(),
  imageUrl: z.string().nonempty().url(),
  storeId: z.string().nonempty().uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const createBillboardSchema = z.object({
  label: z.string().nonempty(),
  imageUrl: z.string().nonempty().url(),
  storeId: z.string().nonempty().uuid(),
});

export const updateBillboardSchema = z.object({
  id: z.string().uuid().nonempty(),
  label: z.string().nonempty(),
  imageUrl: z.string().nonempty().url(),
  storeId: z.string().nonempty().uuid(),
});

export const serverResponseBillboardSchema = z.object({
  billboard: billboardSchema,
});

export const deleteBillboardSchema = z.object({
  id: z.string().uuid().nonempty(),
  storeId: z.string().nonempty().uuid(),
});
export const getBillboardSchema = z.object({
  id: z.string().uuid().nonempty(),
  storeId: z.string().nonempty().uuid(),
});
