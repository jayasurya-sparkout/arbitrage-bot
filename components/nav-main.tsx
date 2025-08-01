"use client"

import { IconCirclePlusFilled, IconMail, type Icon } from "@tabler/icons-react";

import { Button } from "./ui/button";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: Icon
  }[]
}) {
  const pathname = usePathname();
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) => {
            const isActive = pathname.includes(item.url);
            return (
              <SidebarMenuItem key={item.title}>
              <SidebarMenuButton tooltip={item.title} data-active={isActive ? true : false} className={`${isActive ? '!bg-primary' : 'hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 text-white min-w-8 transition-all duration-200 ease-linear'}`}>
                {item.icon && <item.icon />}
                <Link href={item.url} className="">
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
