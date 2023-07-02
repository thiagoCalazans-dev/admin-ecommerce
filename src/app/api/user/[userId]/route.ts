import { storeController } from "@/server/controller/store-controller";

export async function GET(
  request: Request,
  params: { params: { userId: string } }
) {
  return await storeController.getStoreByUserId(request, params);
}
