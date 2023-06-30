import { UserButton, auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const Navbar = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  //   const stores = await prismadb.store.findMany({
  //     where: {
  //       userId,
  //     },
  //   });

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">NAVBAR</div>
    </div>
  );
};

export default Navbar;
