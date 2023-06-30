import { storeController } from "@/server/controller/store-controller";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  return new NextResponse("Olá rota", { status: 200 });
}

export async function POST(request: Request) {
  return await storeController.create(request);
}
