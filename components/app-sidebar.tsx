"use client"

import * as React from "react";
import { IconDashboard, IconInnerShadowTop } from "@tabler/icons-react";
import { useEffect, useState } from "react";

import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/user/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Wallet Management",
      url: "/user/walletmanagement",
      icon: IconDashboard,
    },
    {
      title: "Configure Bot",
      url: "/user/botconfiguration",
      icon: IconDashboard,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  
  const [userName, setUserName] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");

  useEffect(() => {
    const id = localStorage.getItem('userId');
    const name = localStorage.getItem('userName');
    const email = localStorage.getItem('userEmail');
    
    setUserEmail(email!);
    setUserName(name!);
  }, []);

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader className="bg-background rounded-t-2xl shadow-sm !hover:bg-primary">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#" className="">
                <IconInnerShadowTop className="!size-5 text-white" />
                <span className="text-white font-semibold">Acme Inc.</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="bg-background shadow-sm">
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter className="bg-background !hover:bg-primary rounded-b-2xl">
        <NavUser user={{
            name: userName,
            email: userEmail,
          }}
        />
      </SidebarFooter>
    </Sidebar>
  )
}
