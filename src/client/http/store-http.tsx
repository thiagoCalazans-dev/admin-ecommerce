import { CreateStore, Store } from "@/client/models/store-client-model";
import { ServerResponseSchema } from "../schema/store-client-schema";
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

  const parsedResponse = ServerResponseSchema.safeParse(response);

  if (!parsedResponse.success) {
    throw new Error("Something went wrong");
  }
  return parsedResponse.data;
}

export const storeHTTP = {
  create,
};
