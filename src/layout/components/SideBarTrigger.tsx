import { useSidebar } from '@/components/ui/sidebar.tsx';
import { Menu } from 'lucide-react';

export function SidebarTrigger() {
  const { setOpenMobile } = useSidebar();

  return (
    <button onClick={() => setOpenMobile(true)}>
      <Menu color="#ffffff" />
    </button>
  );
}
