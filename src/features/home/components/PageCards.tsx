import styles from './PageCards.module.scss';
import PageCard from '@/features/home/components/PageCard.tsx';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area.tsx';

export default function PageCards() {
  const CARDS_DATA = [
    {
      title: 'Chat',
      description: 'Chat with any Rick and Morty Character',
      path: '/chat',
    },
    {
      title: 'Characters',
      description: 'Checkout all Rick and Morty characters',
      path: '/characters',
    },
    {
      title: 'Authenticate',
      description: 'Authenticate to check your data',
      path: '/sign-up',
    },
  ];

  return (
    <ScrollArea>
      <div className={styles.scroll}>
        {CARDS_DATA.map(({ title, description, path }, index) => (
          <PageCard
            title={title}
            description={description}
            path={path}
            key={index}
          />
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
