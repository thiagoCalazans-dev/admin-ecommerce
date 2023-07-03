import { billboardController } from "@/server/controller/billboard-controller";

export async function POST(
  request: Request,
  params: { params: { storeId: string } }
) {
  return await billboardController.create(request, params);
}

// export async function GET(
//   req: Request,
//   { params }: { params: { storeId: string } }
// ) {
//   try {
//     if (!params.storeId) {
//       return new NextResponse("Store id is required", { status: 400 });
//     }

//     const billboards = await prismadb.billboard.findMany({
//       where: {
//         storeId: params.storeId,
//       },
//     });

//     return NextResponse.json(billboards);
//   } catch (error) {
//     console.log("[BILLBOARDS_GET]", error);
//     return new NextResponse("Internal error", { status: 500 });
//   }
// }
