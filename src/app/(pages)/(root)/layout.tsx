import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";
import prismadb from "@/server/infra/database";
import { storeRepository } from "@/server/repository/store-repository";



export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const store = await storeRepository.getStoreByUserId(userId);
  //TO-DO: Fazer essa informação ver atrasves de um rota da API via fetch server

   if (store) {
    redirect(`/${store.id}`);
  }

  return <>{children}</>;
}
