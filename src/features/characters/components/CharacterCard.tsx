import { Card, CardFooter, CardHeader } from '@/components/ui/card.tsx';
import styles from './CharacterCard.module.scss';
import { Link } from 'react-router';

export default function CharacterCard({
  id,
  name,
  image,
}: {
  id: number;
  name: string;
  image: string;
}) {
  return (
    <Card>
      <Link to={`/character/${id}`} className={styles.wrapper}>
        <CardHeader>
          <img src={image} alt={name} className={styles.image} />
        </CardHeader>
        <CardFooter>
          <span className={styles.name}>{name}</span>
        </CardFooter>
      </Link>
    </Card>
  );
}
