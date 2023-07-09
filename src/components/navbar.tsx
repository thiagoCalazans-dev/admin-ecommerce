import { UserButton, auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { DesktopNav } from "@/components/desktop-nav";
import StoreSwitcher from "@/components/store-switcher";
import prismadb from "@/server/infra/database";
import { MobileNav } from "./mobile-nav";

export async function Navbar() {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const stores = await prismadb.store.findMany({
    where: {
      userId,
    },
  });

  return (
    <div className="border-b">
      <div className="flex h-16 items-center justify-between md:justify-start px-4">
        <StoreSwitcher items={stores} />
        <div className="hidden md:flex md:flex-1 items-center px-4 justify-between">
          <DesktopNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4"></div>
          <UserButton afterSignOutUrl="/" />
        </div>
        <div className="md:hidden">
          <MobileNav />
        </div>
      </div>
    </div>
  );
}


