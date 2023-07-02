import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useStoreModal } from "@/client/hooks/use-store-modal";
import { storeAction } from "@/client/actions/store-actions";
import { toast } from "react-hot-toast";
import { createStoreSchema } from "@/client/schema/store-client-schema";
import { CreateStore } from "@/client/models/store-client-model";

export function StoreForm() {
  const storeModal = useStoreModal();
  const [loading, setLoading] = useState(false);

  const form = useForm<CreateStore>({
    resolver: zodResolver(createStoreSchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(formValues: CreateStore) {
    setLoading(true);
    await storeAction.create({
      createStoreData: formValues,
      onError: () => toast.error("ops, something went wrong"),
    });
    setLoading(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input disabled={loading} placeholder="E-Commerce" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="pt-6 space-x-2 flex items-center justify-end w-full">
          <Button variant="outline" onClick={storeModal.onClose}>
            Cancel
          </Button>
          <Button type="submit">Continue</Button>
        </div>
      </form>
    </Form>
  );
}
