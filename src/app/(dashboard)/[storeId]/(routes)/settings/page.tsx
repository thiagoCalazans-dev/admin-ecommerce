import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";
import prismadb from "@/server/infra/database";
import { SettingsForm } from "@/components/forms/setting-form";
import { Separator } from "@/components/ui/separator";
import { ApiAlert } from "@/components/ui/api-alert";

const SettingsPage = async ({ params }: { params: { storeId: string } }) => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
      userId,
    },
  });

  if (!store) {
    redirect("/");
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SettingsForm initialData={store} />
        <Separator />
        <ApiAlert
          title="NEXT_PUBLIC_API_URL"
          variant="public"
          paramsUrl={params.storeId}
        />
      </div>
    </div>
  );
};

export default SettingsPage;
