import { storeController } from "@/server/controller/store-controller";
import { NextResponse } from "next/server";


export async function GET(req: Request) {
  return new NextResponse("Olá rota", { status: 200 });
}


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
