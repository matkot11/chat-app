import Layout from '@/layout/Layout.tsx';
import { useCharacters } from '@/features/characters/hooks/useCharacters.tsx';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination.tsx';
import { useParams } from 'react-router';
import { useEffect } from 'react';
import styles from './CharactersView.module.scss';
import CharacterCard from '@/features/characters/components/CharacterCard.tsx';

export default function CharactersView() {
  const { characters, getCharacters } = useCharacters();
  const { page } = useParams();

  useEffect(() => {
    if (!page) return;
    getCharacters(parseInt(page) || 1);
  }, [page]);

  const getPreviousPage = () => {
    if (!page) return 1;
    if (parseInt(page) === 1) return page;

    return parseInt(page) - 1;
  };

  const getNextPage = () => {
    const pageCount = characters?.info.pages;
    if (!page) return pageCount || 1;
    if (parseInt(page) === pageCount) return pageCount;

    return parseInt(page) + 1;
  };

  return (
    <Layout>
      <div className={styles.cards}>
        {characters &&
          characters.results.map(({ name, id, image }) => (
            <CharacterCard key={id} id={id} name={name} image={image} />
          ))}
      </div>

      <Pagination>
        <PaginationContent className={styles.pagination}>
          {parseInt(page!) > 1 && (
            <PaginationItem>
              <PaginationPrevious
                to={`/characters/${getPreviousPage()}`}
                className={styles.paginationPreviousLink}
              />
            </PaginationItem>
          )}

          {parseInt(page!) < (characters?.info.pages || 1) && (
            <PaginationItem className={styles.paginationNextLink}>
              <PaginationNext to={`/characters/${getNextPage()}`} />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </Layout>
  );
}
