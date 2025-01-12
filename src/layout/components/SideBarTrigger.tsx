import { useSidebar } from '@/components/ui/sidebar.tsx';
import { Menu } from 'lucide-react';

export function SidebarTrigger() {
  const { toggleSidebar } = useSidebar();

  return (
    <button onClick={toggleSidebar}>
      <Menu color="#ffffff" />
    </button>
  );
}
