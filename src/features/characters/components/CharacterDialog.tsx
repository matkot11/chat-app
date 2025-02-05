import { useEffect } from 'react';
import { useCharacter } from '@/features/characters/hooks/useCharacter.tsx';
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
} from '@/components/ui/dialog.tsx';
import { DialogDescription } from '@radix-ui/react-dialog';
import { Button } from '@/components/ui/button.tsx';
import styles from './CharacterDialod.module.scss';

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
        <DialogDescription className={styles.wrapper}>
          <img
            src={character.image}
            alt={character.name}
            className={styles.image}
          />
          <div className={styles.about}>
            <span className={styles.name}>{character.name}</span>

            <span>gender: {character.gender}</span>
            <span>species: {character.species}</span>
            <span>location: {character.location.name}</span>
          </div>
        </DialogDescription>
      </DialogHeader>

      <DialogFooter>
        {character.status === 'Alive' ? (
          <Button>Text me!</Button>
        ) : (
          <span>I am not alive, texting me is pointless...</span>
        )}
      </DialogFooter>
    </DialogContent>
  );
}
