import { NextResponse } from "next/server";
import { storeRepository } from "../repository/store-repository";
import {
  StoreCreateSchema,
  StoreUpdateByIdSchema,
  userIdStoreSchema,
} from "../schema/store-schema";
import { auth } from "@clerk/nextjs";

async function getStoreByUserId(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const slug = params.userId;
  const userId = userIdStoreSchema.safeParse(slug);

  if (!userId.success) {
    return new NextResponse(" You must be provide a correct string Id", {
      status: 400,
    });
  }

  try {
    const store = await storeRepository.getStoreByUserId(userId.data);
    return NextResponse.json(store, { status: 201 });
  } catch (err) {
    if (err instanceof Error) {
      return new NextResponse(err.message, { status: 404 });
    }
  }
}

async function create(request: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await request.json();

    const data = {
      name: body.name,
      userId,
    };

    const parsedBody = StoreCreateSchema.safeParse(data);

    if (!parsedBody.success) {
      return NextResponse.json(null, {
        status: 400,
        statusText: "You need to provide a name to create a Store",
      });
    }

    const { name, userId: parsedUserId } = parsedBody.data;

    const store = await storeRepository.createStore({
      name,
      userId: parsedUserId,
    });

    return NextResponse.json(store, { status: 201 });
  } catch (error) {
    console.log("[STORE_CONTROLLER]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

async function updateById(
  request: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const body = await request.json();

    const data = {
      name: body.name,
      id: params.storeId,
      userId: userId,
    };

    const parsedData = StoreUpdateByIdSchema.safeParse(data);

    if (!parsedData.success) {
      return NextResponse.json(null, {
        status: 400,
        statusText: "You need to provide a name to update a Store",
      });
    }

    const { name, userId: parsedUserId, id } = parsedData.data;

    const store = await storeRepository.updateStoreById({
      name,
      userId: parsedUserId,
      id,
    });

    return NextResponse.json(store, { status: 200 });
  } catch (error) {
    console.log("[STORE_CONTROLLER_UPDATE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

async function deleteById(
  request: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const data = {
      userId,
      id: params.storeId,
    };

    const parsedData = StoreUpdateByIdSchema.safeParse(data);

    if (!parsedData.success) {
      return NextResponse.json(null, {
        status: 400,
        statusText: "You need to provide a name to update a Store",
      });
    }

    const { name, userId: parsedUserId, id } = parsedData.data;

    const store = await storeRepository.deleteStoreById({
      userId: parsedUserId,
      id,
    });

    return NextResponse.json(store, { status: 200 });
  } catch (error) {
    console.log("[STORE_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}


export const storeController = {
  create,
  getStoreByUserId,
  updateById,
  deleteById,
};
