import axios, { isAxiosError } from 'axios';
import { useState } from 'react';

type Character = {
  id: number;
  created: Date;
  episode: string[];
  gender: string;
  image: string;
  location: {
    name: string;
    url: string;
  };
  name: string;
  origin: {
    name: string;
    url: string;
  };
  species: string;
  status: string;
  type: string;
  url: string;
};

type Characters = {
  info: {
    count: number;
    pages: number;
    next: number | null;
    prev: number | null;
  };
  results: Character[];
};

type UseCharactersReturn = {
  characters: Characters | null;
  loading: boolean;
  error: string | null;
  getCharacters: (page?: number) => void;
};

export const useCharacters = (): UseCharactersReturn => {
  const [characters, setCharacters] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getCharacters = async (page = 1) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://rickandmortyapi.com/api/character/?page=${page}`
      );

      setCharacters(response.data);
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        setError(error.message);
        return;
      }

      setError('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return { characters, loading, error, getCharacters };
};
