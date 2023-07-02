import { storeHTTP } from "@/client/http/store-http";
import {
  createStoreSchema,
  updateStoreSchema,
} from "@/client/schema/store-client-schema";
import { CreateStore, UpdateStore } from "@/client/models/store-client-model";

interface StoreControllerCreateParams {
  createStoreData?: CreateStore;
  onError: (errorMessage?: string) => void;
  //   onSuccess: (sucessMessage?: string) => void;
}

interface StoreControllerUpdateParams {
  updateStoreData?: UpdateStore;
  onError: (errorMessage?: string) => void;
  onSuccess: () => void;
}

async function create({
  createStoreData,
  onError,
}: StoreControllerCreateParams) {
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
}: StoreControllerUpdateParams) {
  const parsedStoreData = updateStoreSchema.safeParse(updateStoreData);

  if (!parsedStoreData.success) {
    onError();
    return;
  }

  console.log(parsedStoreData);

  await storeHTTP
    .updateById(parsedStoreData.data)
    .then((newStore) => {
      onSuccess();
    })
    .catch(() => {
      onError();
    });
}

export const storeAction = {
  create,
  updateById,
};
