import { SidebarProvider } from '@/components/ui/sidebar.tsx';
import React from 'react';
import NavigationBar from '@/layout/components/NavigationBar.tsx';
import DefaultSidebar from '@/layout/components/DefaultSidebar.tsx';
import styles from './Layout.module.scss';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <DefaultSidebar />

      <main className={styles.wrapper}>
        <NavigationBar />
        <div className={styles.children}>{children}</div>
      </main>
    </SidebarProvider>
  );
}
