import { NextResponse } from "next/server";
import { storeRepository } from "../repository/store-repository";
import {
  StoreCreateBodySchema,
  userIdStoreSchema,
} from "../schema/store-schema";
import { auth } from "@clerk/nextjs";

async function getStoreByUserId(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug;
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

    const parsedBody = StoreCreateBodySchema.safeParse(body);

    if (!parsedBody.success) {
      return NextResponse.json(null, {
        status: 400,
        statusText: "You need to provide a name to create a Store",
      });
    }

    const { name } = parsedBody.data;

    const store = await storeRepository.createStore({
      name,
      userId,
    });
    return NextResponse.json(store, { status: 201 });
  } catch (error) {
    console.log("[STORE_CONTROLLER]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export const storeController = {
  create,
  getStoreByUserId,
};
