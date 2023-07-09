"use client";
import { AlignJustify, Link, Router } from "lucide-react";
import { Button } from "./ui/button";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "./ui/menubar";
import { useParams, usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();

  const routes = [
    {
      href: `/${params.storeId}`,
      label: "Overview",
      active: pathname === `/${params.storeId}`,
    },
    {
      href: `/${params.storeId}/billboards`,
      label: "Billboards",
      active: pathname === `/${params.storeId}/billboards`,
    },
    {
      href: `/${params.storeId}/categories`,
      label: "Categories",
      active: pathname === `/${params.storeId}/categories`,
    },
    {
      href: `/${params.storeId}/sizes`,
      label: "Sizes",
      active: pathname === `/${params.storeId}/sizes`,
    },
    {
      href: `/${params.storeId}/colors`,
      label: "Colors",
      active: pathname === `/${params.storeId}/colors`,
    },
    {
      href: `/${params.storeId}/products`,
      label: "Products",
      active: pathname === `/${params.storeId}/products`,
    },
    {
      href: `/${params.storeId}/orders`,
      label: "Orders",
      active: pathname === `/${params.storeId}/orders`,
    },
    {
      href: `/${params.storeId}/settings`,
      label: "Settings",
      active: pathname === `/${params.storeId}/settings`,
    },
  ];
  return (
    <Menubar className="md:hidden">
      <MenubarMenu>
        <MenubarTrigger asChild>
          <Button variant="outline" size="sm">
            <AlignJustify />
          </Button>
        </MenubarTrigger>
        <MenubarContent className="md:hidden">
          {routes.map((route) => (
            <MenubarItem
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary active:scale-95",
                route.active
                  ? "text-black dark:text-white"
                  : "text-muted-foreground"
              )}
              onClick={() => router.push(route.href)}
              key={route.href}
            >
              {route.label}
            </MenubarItem>
          ))}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
