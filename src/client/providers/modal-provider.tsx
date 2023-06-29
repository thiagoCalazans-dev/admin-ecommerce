"use client";

import { StoreModal } from "@/components/modals/store-modal";

import { useEffect, useState } from "react";

export function ModalProvider() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <StoreModal />
    </>
  );
}

//Como nosso layout é um server component, pra nao ter
// problemas de hydration precisa checkar antes de montar um
// componente
