import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import {
  BillboardCreateSchema,
  BillboardDeleteByIdSchema,
  BillboardUpdateByIdSchema,
} from "@/server/schema/billboard-schema";
import { billboardRepository } from "../repository/billboard-repository";

async function getById(
  request: Request,
  { params }: { params: { billboardId: string } }
) {
  try {
    console.log(params.billboardId);

    const data = {
      id: params.billboardId,
    };

    const parsedData = BillboardDeleteByIdSchema.safeParse(data);

    if (!parsedData.success) {
      return NextResponse.json(null, {
        status: 400,
        statusText: "You need to provide a BillbordId to get a Billboard",
      });
    }

    const { id } = parsedData.data;

    const billboard = await billboardRepository.readById({
      id,
    });

    return NextResponse.json(billboard, { status: 200, });
  } catch (error) {
    console.log("[BILLBOARD_GET_BY_ID]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

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
      label: body.label,
      imageUrl: body.imageUrl,
      storeId: params.storeId,
    };

    const parsedData = BillboardCreateSchema.safeParse(data);

    if (!parsedData.success) {
      return NextResponse.json(null, {
        status: 400,
        statusText:
          "You need to provide a correct information to create a Billboard",
      });
    }

    const { label, imageUrl, storeId } = parsedData.data;

    const billboard = await billboardRepository.create({
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

async function updateById(
  request: Request,
  { params }: { params: { billboardId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await request.json();

    console.log(params.billboardId);

    const data = {
      id: params.billboardId,
      label: body.label,
      imageUrl: body.imageUrl,
    };

    const parsedData = BillboardUpdateByIdSchema.safeParse(data);

    console.log(parsedData);

    if (!parsedData.success) {
      return NextResponse.json(null, {
        status: 400,
        statusText:
          "You need to provide a correct information to create a Billboard",
      });
    }

    const { label, imageUrl, id } = parsedData.data;

    const billboard = await billboardRepository.updateByID({
      id,
      label,
      imageUrl,
    });

    return NextResponse.json(billboard, { status: 200 });
  } catch (error) {
    console.log("[BILLBOARD_CONTROLLER_UPDATE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

async function deleteById(
  request: Request,
  { params }: { params: { billboardId: string } }
) {
  try {
    const { userId } = auth();

    console.log(userId);

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    console.log(params.billboardId);

    const data = {
      id: params.billboardId,
    };

    console.log(data);

    const parsedData = BillboardDeleteByIdSchema.safeParse(data);

    if (!parsedData.success) {
      return NextResponse.json(null, {
        status: 400,
        statusText: "You need to provide a storeId to delete a Store",
      });
    }

    const { id } = parsedData.data;

    const billboard = await billboardRepository.deleteById({
      id,
    });

    return NextResponse.json(billboard, { status: 200 });
  } catch (error) {
    console.log("[STORE_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export const billboardController = {
  create,
  getById,
  updateById,
  deleteById,
};
