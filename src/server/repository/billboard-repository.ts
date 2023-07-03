import prismadb from "@/server/infra/database";
import { BillboardSchema } from "@/server/schema/billboard-schema";
import { CreateBillboard } from "@/server/model/billboard-model";

async function createBillboard(data: CreateBillboard) {
  const { label, imageUrl, storeId } = data;

  const billboard = await prismadb.billboard.create({
    data: {
      label,
      imageUrl,
      storeId,
    },
  });

  const parsedData = BillboardSchema.safeParse(billboard);
  if (!parsedData.success) throw new Error("Failed to parse STORE created...");
  return parsedData.data;
}

export const billboardRepository = {
  createBillboard,
};
