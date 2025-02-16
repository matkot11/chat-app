import axios, { isAxiosError } from 'axios';
import { useState } from 'react';
import { Characters } from '@/typings/characters.ts';
import { useToast } from '@/hooks/use-toast.ts';

type UseCharactersReturn = {
  characters: Characters | null;
  loading: boolean;
  getCharacters: (page?: number) => void;
};

export const useCharacters = (): UseCharactersReturn => {
  const [characters, setCharacters] = useState(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const getCharacters = async (page = 1) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://rickandmortyapi.com/api/character/?page=${page}`
      );

      setCharacters(response.data);
    } catch (error: unknown) {
      if (isAxiosError(error)) {
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

  return { characters, loading, getCharacters };
};
