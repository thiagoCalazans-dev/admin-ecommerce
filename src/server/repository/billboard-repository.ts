import prismadb from "@/server/infra/database";
import { BillboardSchema } from "@/server/schema/billboard-schema";
import {
  CreateBillboard,
  DeleteBillboard,
  GetBillboard,
  UpdateBillboard,
} from "@/server/model/billboard-model";

async function readById(data: GetBillboard) {
  const { id } = data;

  const billboard = await prismadb.billboard.findUnique({
    where: {
      id,
    },
  });

  const parsedData = BillboardSchema.safeParse(billboard);
  if (!parsedData.success)
    throw new Error("Failed to return updated billboard...");
  return parsedData.data;
}

async function create(data: CreateBillboard) {
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

async function updateByID(data: UpdateBillboard) {
  const { label, imageUrl, id } = data;

  const billboard = await prismadb.billboard.update({
    where: {
      id: id,
    },
    data: {
      label,
      imageUrl,
    },
  });

  const updatedBillboard = await prismadb.billboard.findFirst({
    where: {
      id: id,
    },
  });

  console.log(updatedBillboard);

  const parsedData = BillboardSchema.safeParse(updatedBillboard);
  if (!parsedData.success)
    throw new Error("Failed to return updated billboard...");
  return parsedData.data;
}

async function deleteById(data: DeleteBillboard) {
  const { id } = data;

  const billboard = await prismadb.store.deleteMany({
    where: {
      id,
    },
  });

  return billboard;
}

export const billboardRepository = {
  create,
  readById,
  updateByID,
  deleteById,
};
