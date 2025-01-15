import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx';
import { Link } from 'react-router';
import { buttonVariants } from '@/components/ui/button.tsx';
import { MoveRight } from 'lucide-react';
import styles from './PageCard.module.scss';

export default function PageCard({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}) {
  return (
    <Card className={styles.wrapper}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription className={styles.description}>
          {description}
        </CardDescription>
      </CardHeader>

      <CardFooter>
        <Link className={buttonVariants({ className: styles.link })} to={path}>
          Go <MoveRight />
        </Link>
      </CardFooter>
    </Card>
  );
}
