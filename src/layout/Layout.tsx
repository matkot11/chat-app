import { SidebarProvider } from '@/components/ui/sidebar.tsx';
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile.tsx';
import NavigationBar from '@/layout/components/NavigationBar.tsx';
import DefaultSidebar from '@/layout/components/DefaultSidebar.tsx';

export default function Layout({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();

  return (
    <SidebarProvider open={!isMobile}>
      <DefaultSidebar />

      <main>
        <NavigationBar />
        {children}
      </main>
    </SidebarProvider>
  );
}
