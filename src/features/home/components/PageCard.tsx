import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx';
import { Link } from 'react-router';
import { Button, buttonVariants } from '@/components/ui/button.tsx';
import { MoveRight } from 'lucide-react';
import styles from './PageCard.module.scss';
import { useSignOut } from '@/features/auth/hooks/useSignOut.ts';

export default function PageCard({
  title,
  description,
  path,
  authenticated,
}: {
  title: string;
  description: string;
  path?: string;
  authenticated?: boolean;
}) {
  const { signOut } = useSignOut();

  return (
    <Card className={styles.wrapper}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription className={styles.description}>
          {description}
        </CardDescription>
      </CardHeader>

      <CardFooter>
        {authenticated || !path ? (
          <Button onClick={signOut} className={styles.link}>
            Sign out <MoveRight />
          </Button>
        ) : (
          <Link
            className={buttonVariants({ className: styles.link })}
            to={path}
          >
            Go <MoveRight />
          </Link>
        )}
      </CardFooter>
    </Card>
  );
}
