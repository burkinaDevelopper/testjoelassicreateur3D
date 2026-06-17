"use client";

import { useEffect } from "react";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";
import { BreakpointProvider } from "@/app/contexts/breakpoint/Provider";
import { LocaleProvider } from "@/app/contexts/locale/Provider";
import { SidebarProvider } from "@/app/contexts/sidebar/Provider";
import { ThemeProvider } from "@/app/contexts/theme/Provider";
import { useThemeContext } from "@/app/contexts/theme/context";
import { setupAxiosInterceptors } from "@/utils/axiosInterceptor";

import "@/i18n/config";
// import "simplebar-react/dist/simplebar.min.css";

function ToasterWithTheme() {
  const { notification } = useThemeContext();
  
  return (
    <Toaster 
      position={"bottom-right"} 
      expand={notification.isExpanded}
      visibleToasts={notification.visibleToasts}
      richColors 
    />
  );
}

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    setupAxiosInterceptors();
  }, []);

  return (
    <SessionProvider>
      <ThemeProvider>
        <LocaleProvider>
          <BreakpointProvider>
            <SidebarProvider>
              {children}
              <ToasterWithTheme />
            </SidebarProvider>
          </BreakpointProvider>
        </LocaleProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
