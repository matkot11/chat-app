import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarMenuButton,
} from '@/components/ui/sidebar.tsx';
import SidebarLink from '@/layout/components/SidebarLink.tsx';
import { Separator } from '@/components/ui/separator.tsx';
import styles from './DefaultSidebar.module.scss';
import { useSignOut } from '@/features/auth/hooks/useSignOut.ts';
import { useGetUser } from '@/features/auth/hooks/useGetUser.ts';

export default function DefaultSidebar() {
  const { signOut } = useSignOut();
  const { user } = useGetUser();

  return (
    <Sidebar className="opacity-100">
      <SidebarContent>
        <SidebarGroup>
          {user && (
            <div className={styles.userWrapper}>
              <SidebarMenuButton>
                Hi {user.user_metadata.name}!
              </SidebarMenuButton>
              <Separator />
            </div>
          )}

          <SidebarLink path="/" name="Home" />
          <SidebarLink path="/characters/1" name="Characters" />
          <SidebarLink path="/chat" name="Chat" />
          {!user && <SidebarLink path="/auth" name="Authenticate" />}
        </SidebarGroup>
      </SidebarContent>

      {user && (
        <SidebarFooter>
          <SidebarMenuButton onClick={signOut}>Sign out</SidebarMenuButton>
        </SidebarFooter>
      )}
    </Sidebar>
  );
}
