import { Store } from "@/client/models/store-client-model";
import { storeHTTP } from "@/client/http/store-http";
import {
  ServerResponseSchema,
  createStoreSchema,
} from "@/client/schema/store-client-schema";
import { CreateStore } from "@/client/models/store-client-model";

interface StoreControllerCreateParams {
  createStoreData?: CreateStore;
  onError: (errorMessage?: string) => void;
  //   onSuccess: (sucessMessage?: string) => void;
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

export const storeAction = {
  create,
};
