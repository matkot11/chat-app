import axios, { isAxiosError } from 'axios';
import { useState } from 'react';
import { Characters } from '@/typings/characters.ts';
import { useToast } from '@/hooks/use-toast.ts';

type UseCharactersReturn = {
  characters: Characters | null;
  loading: boolean;
  filterCharacters: (name: string) => void;
};

export const useFilterCharacters = (): UseCharactersReturn => {
  const [characters, setCharacters] = useState(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const filterCharacters = async (name: string) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://rickandmortyapi.com/api/character/?name=${name}`
      );

      setCharacters(response.data);
    } catch (error: unknown) {
      setCharacters(null);

      if (isAxiosError(error)) {
        if (error.status === 404) return; // NOTE: Do not throw error if no characters have been found.

        toast({
          title: 'An error occurred',
          description: error.message,
        });
        return;
      }

      toast({
        title: 'An error occurred',
        description: 'An error occurred while fetching characters',
      });
    } finally {
      setLoading(false);
    }
  };

  return { characters, loading, filterCharacters };
};
