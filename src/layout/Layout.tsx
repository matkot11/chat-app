import { SidebarProvider } from '@/components/ui/sidebar.tsx';
import React from 'react';
import NavigationBar from '@/layout/components/NavigationBar.tsx';
import DefaultSidebar from '@/layout/components/DefaultSidebar.tsx';
import styles from './Layout.module.scss';
import { Toaster } from '@/components/ui/toaster.tsx';
import { cn } from '@/lib/utils.ts';

export default function Layout({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <SidebarProvider>
      <DefaultSidebar />

      <main className={styles.wrapper}>
        <NavigationBar />
        <div className={cn(styles.children, className)}>{children}</div>

        <Toaster />
      </main>
    </SidebarProvider>
  );
}
