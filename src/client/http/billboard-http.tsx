import {
  Billboard,
  CreateBillboard,
  ServerReponseBillboardCreate,
} from "@/client/models/billboard-client-model";
import { api } from "@/lib/ky";
import { serverResponseBillboardSchema } from "@/client/schema/billboard-client-schema";

async function create(billboard: CreateBillboard): Promise<Billboard> {
  const { imageUrl, label, storeId } = billboard;


 

  const response: ServerReponseBillboardCreate = await api
    .post("billboards", {
      json: {
        label,
        storeId,
        imageUrl,
      },
    })
    .json();

   console.log(response);

  const parsedResponse = serverResponseBillboardSchema.safeParse(response);

  if (!parsedResponse.success) {
    throw new Error("Something went wrong");
  }
  return parsedResponse.data.billboard;
}

export const billboardHTTP = {
  create,
};
