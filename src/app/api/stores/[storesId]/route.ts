import { storeController } from "@/server/controller/store-controller";

export async function PATCH(
  request: Request,
  params: { params: { storeId: string } }
) {
  return await storeController.updateById(request, params);
}

export async function DELETE(
  request: Request,
  params: { params: { storeId: string } }
) {
  return await storeController.deleteById(request, params);
}
