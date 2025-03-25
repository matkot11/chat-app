import styles from './PageCards.module.scss';
import PageCard from '@/features/home/components/PageCard.tsx';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area.tsx';
import { useEffect, useState } from 'react';
import { useGetUser } from '@/features/auth/hooks/useGetUser.ts';
import { LoaderCircle } from 'lucide-react';

type CardsData = {
  title: string;
  description: string;
  path?: string;
  authenticated?: boolean;
};

export default function PageCards() {
  const UNAUTHENTICATED_TITLE = 'Authenticate';
  const CARDS_DATA_UNAUTHENTICATED: CardsData[] = [
    {
      title: 'Characters',
      description: 'Checkout all Rick and Morty characters',
      path: '/characters/1',
    },
    {
      title: 'Chat',
      description: 'Chat with any Rick and Morty Character',
      path: '/chat',
    },
    {
      title: UNAUTHENTICATED_TITLE,
      description: 'Authenticate to check your data',
      path: '/auth',
      authenticated: false,
    },
  ];

  const [cards, setCards] = useState<CardsData[]>(CARDS_DATA_UNAUTHENTICATED);
  const { user, userLoading } = useGetUser();

  useEffect(() => {
    if (!user) return;

    const cardsDataAuthenticated = CARDS_DATA_UNAUTHENTICATED.filter(
      ({ title }) => title !== UNAUTHENTICATED_TITLE
    );

    setCards([
      ...cardsDataAuthenticated,
      {
        title: `Hi ${user.user_metadata.name}!`,
        description: 'Welcome back Rick and Morty fan',
        authenticated: true,
      },
    ]);
  }, [user]);

  return (
    <ScrollArea>
      <div className={styles.scroll}>
        {userLoading ? (
          <LoaderCircle />
        ) : (
          cards.map(({ title, description, path, authenticated }, index) => (
            <PageCard
              title={title}
              description={description}
              path={path}
              authenticated={authenticated}
              key={index}
            />
          ))
        )}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
