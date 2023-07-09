import {
  CreateStore,
  DeleteStore,
  Store,
  UpdateStore,
} from "@/client/models/store-client-model";
import { serverResponseSchema } from "../schema/store-client-schema";
import { api } from "@/lib/ky";

async function create(store: CreateStore): Promise<Store> {
  const { name } = store;

  const response: Store = await api
    .post("stores", {
      json: {
        name,
      },
    })
    .json();

  const parsedResponse = serverResponseSchema.safeParse(response);

  if (!parsedResponse.success) {
    throw new Error("Something went wrong");
  }
  return parsedResponse.data;
}

async function updateById(data: UpdateStore): Promise<Store> {
  const { id: storeId, name } = data;
  console.log(storeId, name);

  const response: Store = await api
    .patch(`stores/${storeId}`, {
      json: {
        id: storeId,
        name,
      },
    })
    .json();

  const parsedResponse = serverResponseSchema.safeParse(response);

  if (!parsedResponse.success) {
    throw new Error("Something went wrong");
  }
  return parsedResponse.data;
}

async function deleteById(data: DeleteStore): Promise<any> {
  const { id: storeId } = data;

  console.log(storeId);

  const response: Store = await api.delete(`stores/${storeId}`).json();

  console.log(response)
  return response;
}

export const storeHTTP = {
  create,
  updateById,
  deleteById,
};
