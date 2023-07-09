import { storeHTTP } from "@/client/http/store-http";
import {
  createStoreSchema,
  deleteStoreSchema,
  updateStoreSchema,
} from "@/client/schema/store-client-schema";
import {
  CreateStore,
  DeleteStore,
  UpdateStore,
} from "@/client/models/store-client-model";

interface StoreActionCreateParams {
  createStoreData?: CreateStore;
  onError: (errorMessage?: string) => void;
  //   onSuccess: (sucessMessage?: string) => void;
}

interface StoreActionUpdateParams {
  updateStoreData?: UpdateStore;
  onError: (errorMessage?: string) => void;
  onSuccess: () => void;
}

interface StoreActionDeleteParams {
  deleteStoreId?: DeleteStore;
  onError: (errorMessage?: string) => void;
  onSuccess: () => void;
}

async function create({
  createStoreData,
  onError,
}: StoreActionCreateParams) {
  const parsedStoreData = createStoreSchema.safeParse(createStoreData);

  if (!parsedStoreData.success) {
    onError();
    return;
  }

  await storeHTTP
    .create(parsedStoreData.data)
    .then((newStore) => {
      window.location.assign(`/${newStore.id}`);
    })
    .catch(() => {
      onError();
    });
}

async function updateById({
  updateStoreData,
  onError,
  onSuccess,
}: StoreActionUpdateParams) {
  const parsedStoreData = updateStoreSchema.safeParse(updateStoreData);

  if (!parsedStoreData.success) {
    onError();
    return;
  }

  await storeHTTP
    .updateById(parsedStoreData.data)
    .then(() => {
      onSuccess();
    })
    .catch(() => {
      onError();
    });
}

async function deleteById({
  deleteStoreId,
  onError,
  onSuccess,
}: StoreActionDeleteParams) {
  const parsedStoreData = deleteStoreSchema.safeParse(deleteStoreId);

  if (!parsedStoreData.success) {
    onError();
    return;
  }

  await storeHTTP
    .deleteById(parsedStoreData.data)
    .then(() => {
      onSuccess();
    })
    .catch(() => {
      onError();
    });
}

export const storeAction = {
  create,
  updateById,
  deleteById,
};
