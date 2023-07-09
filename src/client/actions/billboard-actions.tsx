import {
  createBillboardSchema,
  deleteBillboardSchema,
  getBillboardSchema,
  updateBillboardSchema,
} from "@/client/schema/billboard-client-schema";
import {
  CreateBillboard,
  DeleteBillboard,
  GetBillboard,
  UpdateBillboard,
} from "@/client/models/billboard-client-model";
import { billboardHTTP } from "../http/billboard-http";

interface BillboardActionCreateParams {
  createBillboardData: CreateBillboard;
  onError: () => void;
  onSuccess: () => void;
}

interface BillboardActionUpdateParams {
  updateBillboardData: UpdateBillboard;
  onError: () => void;
  onSuccess: () => void;
}

interface BillboardActionDeleteParams {
  deleteBillboardId: DeleteBillboard;
  onError: () => void;
  onSuccess: () => void;
}
interface BillboardActionGetByIdParams {
  billboardId: string;
  storeId: string;
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

async function updateById({
  updateBillboardData,
  onError,
  onSuccess,
}: BillboardActionUpdateParams) {
  const parsedBillboardData =
    updateBillboardSchema.safeParse(updateBillboardData);

  if (!parsedBillboardData.success) {
    onError();
    return;
  }

  await billboardHTTP
    .updateById(parsedBillboardData.data)
    .then(() => {
      onSuccess();
    })
    .catch(() => {
      onError();
    });
}

async function deleteById({
  deleteBillboardId,
  onError,
  onSuccess,
}: BillboardActionDeleteParams) {
  const parsedBillboardData =
    deleteBillboardSchema.safeParse(deleteBillboardId);

  if (!parsedBillboardData.success) {
    onError();
    return;
  }

  const result = await billboardHTTP
    .deleteById(parsedBillboardData.data)
    .then(() => {
      onSuccess();
    })
    .catch((e) => {
      console.log(e);
    });
}

async function getById({ billboardId, storeId }: BillboardActionGetByIdParams) {
  const billboardParams = {
    id: billboardId,
    storeId,
  };
  const parsedBillboard = getBillboardSchema.safeParse(billboardParams);

  if (!parsedBillboard.success) {
    throw new Error("failed to Parse data");
  }

  const response = await billboardHTTP.server.getById(parsedBillboard.data);
  return response;
}

export const billboardAction = {
  create,
  deleteById,
  updateById,
  server: {
    getById,
  },
};
