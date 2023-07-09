import {
  Billboard,
  CreateBillboard,
  DeleteBillboard,
  GetBillboard,
  ServerReponseBillboard,
  UpdateBillboard,
} from "@/client/models/billboard-client-model";
import { api, prefixUrl } from "@/lib/ky";
import { serverResponseBillboardSchema } from "@/client/schema/billboard-client-schema";
import { isConstructorDeclaration } from "typescript";
import { error } from "console";

async function create(billboard: CreateBillboard): Promise<Billboard> {
  const { imageUrl, label, storeId } = billboard;

  const response: ServerReponseBillboard = await api
    .post(`${storeId}/billboards`, {
      json: {
        label,
        storeId,
        imageUrl,
      },
    })
    .json();

  const parsedResponse = serverResponseBillboardSchema.safeParse(response);

  if (!parsedResponse.success) {
    throw new Error("Something went wrong");
  }
  return parsedResponse.data.billboard;
}

async function updateById(billboard: UpdateBillboard): Promise<Billboard> {
  const { imageUrl, label, storeId, id: billboardId } = billboard;

  const response: ServerReponseBillboard = await api
    .patch(`${storeId}/billboards/${billboardId}`, {
      json: {
        label,
        imageUrl,
      },
    })
    .json();

  const parsedResponse = serverResponseBillboardSchema.safeParse(response);

  if (!parsedResponse.success) {
    throw new Error("Something went wrong");
  }
  return parsedResponse.data.billboard;
}

async function deleteById(data: DeleteBillboard): Promise<any> {
  const { id: billboardId, storeId } = data;

  console.log(data);

  const response = await api
    .delete(`${storeId}/billboards/${billboardId}`)
    .json();

  return response;
}

async function getById(data: GetBillboard): Promise<Billboard> {
  const { id: billboardId, storeId } = data;
  const response = await fetch(`${prefixUrl}/${storeId}/billboards`, {
    cache: "no-store",
    credentials: "include",
  });
  if (!response.ok) {
    console.log(response);
  }
  return response.json();
}

export const billboardHTTP = {
  create,
  deleteById,
  updateById,
  server: {
    getById,
  },
};
