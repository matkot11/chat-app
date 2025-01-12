import { SidebarTrigger } from '@/layout/components/SideBarTrigger.tsx';
import { useIsMobile } from '@/hooks/use-mobile.tsx';
import styles from './NavigationBar.module.scss';

export default function NavigationBar() {
  const isMobile = useIsMobile();

  return (
    <div className={styles.wrapper}>
      <img src="/title.png" alt="Title" className={styles.image} />
      {isMobile && <SidebarTrigger />}
    </div>
  );
}
