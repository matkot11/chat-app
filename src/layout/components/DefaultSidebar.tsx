import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
} from '@/components/ui/sidebar.tsx';
import SidebarLink from '@/layout/components/SidebarLink.tsx';

export default function DefaultSidebar() {
  return (
    <Sidebar side="right" className="opacity-100">
      <SidebarContent>
        <SidebarGroup>
          <SidebarLink path="/" name="Home" />
          <SidebarLink path="/characters" name="Characters" />
          <SidebarLink path="/chat" name="Chat" />
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarGroup>
          <SidebarLink path="/sign-in" name="Sign In" />
          <SidebarLink path="/sign-up" name="Sign Up" />
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
}
