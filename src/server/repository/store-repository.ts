import prismadb from "../infra/database";
import {
  CreateStore,
  DeleteStore,
  UpdateStore,
} from "@/server/model/store-model";
import {
  StoreDeletedByIdSchemaReponse,
  StoreSchema,
} from "../schema/store-schema";

async function getStoreByUserId(userId: string) {
  const store = await prismadb.store.findFirst({
    where: {
      userId,
    },
  });
  const parsedData = StoreSchema.safeParse(store);
  if (!parsedData.success) return null;
  return parsedData.data;
}

async function getStoreByIdAndUserId(id: string, userId: string) {
  const store = await prismadb.store.findFirst({
    where: {
      id,
      userId,
    },
  });
  const parsedData = StoreSchema.safeParse(store);
  if (!parsedData.success) return null;
  return parsedData.data;
}

async function createStore(data: CreateStore) {
  const { name, userId } = data;

  const store = await prismadb.store.create({
    data: {
      name,
      userId,
    },
  });

  const parsedData = StoreSchema.safeParse(store);
  if (!parsedData.success) throw new Error("Failed to parse STORE created...");
  return parsedData.data;
}

async function updateStoreById(data: UpdateStore) {
  const { name, userId, id } = data;

  const store = await prismadb.store.updateMany({
    where: {
      id,
      userId,
    },
    data: {
      name,
    },
  });

  const updatedStore = await prismadb.store.findFirst({
    where: {
      id,
      userId,
    },
  });

  const parsedData = StoreSchema.safeParse(updatedStore);
  if (!parsedData.success) throw new Error("Failed to update STORE created...");
  return parsedData.data;
}

async function deleteStoreById(data: DeleteStore) {
  const { userId, id } = data;

  const store = await prismadb.store.deleteMany({
    where: {
      id,
      userId,
    },
  });

  const parsedData = StoreDeletedByIdSchemaReponse.safeParse(store);

  if (!parsedData.success) throw new Error("Failed to update STORE created...");
  return parsedData.data;
}

export const storeRepository = {
  createStore,
  getStoreByUserId,
  getStoreByIdAndUserId,
  updateStoreById,
  deleteStoreById,
};
