import { billboardAction } from "@/client/actions/billboard-actions";
import { DeleteButton } from "@/components/delete-data-button";
import { BillboardForm } from "@/components/forms/billboard-form";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import prismadb from "@/server/infra/database";

export default async function BillboardPage({
  params,
}: {
  params: { billboardId: string; storeId: string };
}) {
  const billboard = await prismadb.billboard.findUnique({
    where: {
      id: params.billboardId,
    },
  });

  const title = billboard ? "Edit billboard" : "Create billboard";
  const description = billboard ? "Edit a billboard." : "Add a new billboard";

  return (
    <div className="flex-col w-full">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <Heading title={title} description={description} />
          {billboard && (
            <DeleteButton
              deleteAction={billboardAction.deleteById({
                deleteBillboardId: {
                  id: billboard.id,
                  storeId: billboard.storeId,
                },
                onSuccess: () => {
                  console.log("suuuuucesso");
                },
                onError: () => {
                  console.log("desgraça");
                },
              })}
            />
          )}
        </div>
        <Separator />
        <BillboardForm initialData={billboard} />
      </div>
    </div>
  );
}
