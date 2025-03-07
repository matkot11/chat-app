import { useEffect } from 'react';
import { useCharacter } from '@/features/characters/hooks/useCharacter.tsx';
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog.tsx';
import { DialogDescription } from '@radix-ui/react-dialog';
import { buttonVariants } from '@/components/ui/button.tsx';
import styles from './CharacterDialod.module.scss';
import { Link } from 'react-router';

export default function CharacterDialog({ id }: { id: string }) {
  const { getCharacter, character } = useCharacter();

  useEffect(() => {
    if (!id) return;
    getCharacter(id);
  }, []);

  if (!character) return <span>loading</span>;

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{character.name}</DialogTitle>

        <DialogDescription className={styles.wrapper}>
          <img
            src={character.image}
            alt={character.name}
            className={styles.image}
          />
          <div className={styles.about}>
            <span>gender: {character.gender}</span>
            <span>species: {character.species}</span>
            <span>location: {character.location.name}</span>
          </div>
        </DialogDescription>
      </DialogHeader>

      <DialogFooter>
        {character.status === 'Alive' ? (
          <Link
            className={buttonVariants({ className: styles.link })}
            to="/chat"
          >
            Text me!
          </Link>
        ) : (
          <span>I am not alive, texting me is pointless...</span>
        )}
      </DialogFooter>
    </DialogContent>
  );
}
