import { Card, CardFooter, CardHeader } from '@/components/ui/card.tsx';
import styles from './CharacterCard.module.scss';
import { Dialog, DialogTrigger } from '@/components/ui/dialog.tsx';
import CharacterDialog from '@/features/characters/components/CharacterDialog.tsx';

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
    <Dialog>
      <DialogTrigger>
        <Card className={styles.wrapper}>
          <CardHeader>
            <img src={image} alt={name} className={styles.image} />
          </CardHeader>
          <CardFooter>
            <span className={styles.name}>{name}</span>
          </CardFooter>
        </Card>
      </DialogTrigger>

      <CharacterDialog id={id.toString()} />
    </Dialog>
  );
}
