"use client";

import { useStoreModal } from "@/hooks/use-store-modal";
import { Modal } from "@/components/ui/modal";
import { StoreForm } from "@/components/forms/store-form";



export function StoreModal() {
  const storeModal = useStoreModal(); 

  return (
    <Modal
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
      title="Create Store"
      description="Add a new store to manage products categories"
    >
      <div className="space-y-4 py-2 pb-4">
        <StoreForm />
      </div>
    </Modal>
  );
}
