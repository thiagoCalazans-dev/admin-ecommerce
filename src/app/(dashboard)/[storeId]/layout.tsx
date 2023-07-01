import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";

import prismadb from "@/server/infra/database";
import Navbar from "@/components/navbar";
import { storeRepository } from "@/server/repository/store-repository";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const store = await storeRepository.getStoreByIdAndUserId(
    params.storeId,
    userId
  );
  //TO-DO: Fazer essa informação ver atrasves de um rota da API via fetch server

  if (!store) {
    redirect("/");
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
