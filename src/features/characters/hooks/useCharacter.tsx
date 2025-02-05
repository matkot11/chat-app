import axios, { isAxiosError } from 'axios';
import { useState } from 'react';
import { Character } from '@/typings/characters.ts';
import { useToast } from '@/hooks/use-toast.ts';

type UseCharacterReturn = {
  character: Character | null;
  loading: boolean;
  getCharacter: (id: string) => void;
};

export const useCharacter = (): UseCharacterReturn => {
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();

  const getCharacter = async (id: string) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://rickandmortyapi.com/api/character/${id}`
      );

      setCharacter(response.data);
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
        description: 'An error occurred while fetching the character',
      });
    } finally {
      setLoading(false);
    }
  };

  return { character, loading, getCharacter };
};
