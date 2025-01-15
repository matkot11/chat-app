import styles from './HomeView.module.scss';
import { Separator } from '@/components/ui/separator.tsx';
import { buttonVariants } from '@/components/ui/button.tsx';
import { Github } from 'lucide-react';
import PageCards from '@/features/home/components/PageCards.tsx';

export default function HomeView() {
  return (
    <div className={styles.wrapper}>
      <img src="/title.png" alt="Title" className={styles.image} />
      <p className={styles.text}>
        Hello fellow friend, welcome in universe, where you can chat with anyone
        from Rick and Morty universe.
      </p>

      <Separator />

      <h3 className={styles.header}>Jump to:</h3>
      <PageCards />

      <Separator />

      <h3 className={styles.header}>Check out source code:</h3>
      <a
        className={buttonVariants({ className: styles.github })}
        href="https://github.com/matkot11/chat-app"
      >
        <Github /> Github
      </a>
    </div>
  );
}
