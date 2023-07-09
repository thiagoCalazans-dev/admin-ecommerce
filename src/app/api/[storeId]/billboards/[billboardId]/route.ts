import { billboardController } from "@/server/controller/billboard-controller";


export async function GET(
  request: Request,
  params: { params: { storeId: string; billboardId: string } }
) {
  console.log(params.params);
   return await billboardController.getById(request, params);
}

export async function PATCH(
  request: Request,
  params: { params: { storeId: string; billboardId: string } }
) {
  return await billboardController.updateById(request, params);
}

export async function DELETE(
  request: Request,
  params: { params: { storeId: string; billboardId: string } }
) {
  console.log(params)
  return await billboardController.deleteById(request, params);
}
