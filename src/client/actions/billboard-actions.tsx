import { createBillboardSchema } from "@/client/schema/billboard-client-schema";
import { CreateBillboard } from "@/client/models/billboard-client-model";
import { billboardHTTP } from "../http/billboard-http";

interface BillboardActionCreateParams {
  createBillboardData: CreateBillboard;
  onError: () => void;
  onSuccess: () => void;
}

async function create({
  createBillboardData,
  onError,
  onSuccess,
}: BillboardActionCreateParams) {
  const parsedBillboardData =
    createBillboardSchema.safeParse(createBillboardData);


  if (!parsedBillboardData.success) {
    onError();
    return;
  }

  await billboardHTTP
    .create(parsedBillboardData.data)
    .then(() => onSuccess())
    .catch(() => {
      onError();
    });
}

export const billboardAction = {
  create,
};
