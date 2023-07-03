import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { BillboardCreateSchema } from "@/server/schema/billboard-schema";
import { billboardRepository } from "../repository/billboard-repository";

async function create(
  request: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    const body = await request.json();

    const data = {
      label: body.name,
      umageUrl: body.imageUrl,
      storeId: params.storeId,
    };

    const parsedData = BillboardCreateSchema.safeParse(data);

    console.log(parsedData);

    if (!parsedData.success) {
      return NextResponse.json(null, {
        status: 400,
        statusText: "You need to provide a correct information to create a Billboard",
      });
    }

    const { label, imageUrl, storeId } = parsedData.data;

    const billboard = await billboardRepository.createBillboard({
      label,
      imageUrl,
      storeId,
    });

    return NextResponse.json(billboard, { status: 201 });
  } catch (error) {
    console.log("[BILLBOARD_CONTROLLER]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export const billboardController = {
  create,
};
