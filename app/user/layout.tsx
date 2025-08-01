
import { AppSidebar } from "../../components/app-sidebar";
import { SiteHeader } from "../../components/site-header";
import {
  SidebarInset,
  SidebarProvider,
} from "../../components/ui/sidebar";
import { ThemeProvider } from "../../context/theme-context";
import ThemeSwitcher from "../../components/theme-switcher";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider>
      <SidebarProvider 
        className="relative !bg-[#ffffff] max-h-screen overflow-hidden"
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        <AppSidebar variant="inset" className="" />
        <SidebarInset>
          <SiteHeader />
          <div className="flex flex-1 flex-col overflow-y-scroll thin-scrollbar">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                {children}
              </div>
            </div>
          </div>
        </SidebarInset>
        <div className="fixed bottom-[30px] right-[30px]">
          <ThemeSwitcher />
        </div>
      </SidebarProvider>
    </ThemeProvider>
  );
}



