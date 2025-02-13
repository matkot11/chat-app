import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
} from '@/components/ui/sidebar.tsx';
import SidebarLink from '@/layout/components/SidebarLink.tsx';

export default function DefaultSidebar() {
  return (
    <Sidebar className="opacity-100">
      <SidebarContent>
        <SidebarGroup>
          <SidebarLink path="/" name="Home" />
          <SidebarLink path="/characters/1" name="Characters" />
          <SidebarLink path="/chat" name="Chat" />
          <SidebarLink path="/auth" name="Authenticate" />
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
