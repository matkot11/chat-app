import { SidebarMenuButton } from '@/components/ui/sidebar.tsx';
import { NavLink, useLocation } from 'react-router';

export default function SidebarLink({
  path,
  name,
}: {
  path: string;
  name: string;
}) {
  const location = useLocation();

  return (
    <SidebarMenuButton asChild isActive={location.pathname === path}>
      <NavLink to={path}>{name}</NavLink>
    </SidebarMenuButton>
  );
}
